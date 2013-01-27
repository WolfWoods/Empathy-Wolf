var loadWolves = function (settings, data, game) {
    var wolves = data.Wolves;
    var d = new Date();
    for (var i = 0; i < wolves.length; i++) {
        wolves[i].sprite = new Sprite(215, 86);
        wolves[i].sprite.image = game.assets["img/wolf_small.png"];
        wolves[i].sprite.x = wolves[i].startX * settings.tileSize;
        wolves[i].sprite.y = 365;
        wolves[i].speed = 5;
        data.layers[0].stage.addChild(wolves[i].sprite);
        
        wolves[i].facingRight = true;
        wolves[i].nextActionAt = d.getTime() + 1;
        
        wolves[i].timeToAct = function (currentTime) {
            if(currentTime > this.nextActionAt){
                return true;
            }
            return false;
        }; 
        
        wolves[i].pursue = function () {
            var wolf = this.sprite;
            var playerDistance = 0
            if(wolf.facingRight){
                playerDistance = data.player.x - wolf.x;
            }
            else{
                playerDistance = wolf.x - data.player.x;
            }
            if(playerDistance <= 0){
                this.turn();
            }
            wolf.pursuing = true;
            if(wolf.facingRight){
                wolf.x += settings.tileSize;
            }
            else{
                wolf.x -= settings.tileSize;
            }
        };
        wolves[i].turn = function () {
            var wolf = this.sprite;
            wolf.facingRight = !wolf.facingRight;
        };
        
        wolves[i].awareOfPlayer = function (data) {
            var wolf = this.sprite;
            if(wolf.facingRight){
                if(data.player.x - wolf.x < 16 * settings.tileSize){
                    return true;
                }
            }
            else{
                if(wolf.x - data.player.x < 16 * settings.tileSize){
                    return true;
                }
            }
            return false
        };
        wolves[i].fidget = function () {
            var wolf = this.sprite;
            if(wolf.facingRight){
                wolf.x += 1;
            }
            else{
                wolf.x -= 1;
            }
                
        };
        wolves[i].hunt = function () {
            var wolf = this.sprite;
        };
    }
}

    
var wolvesBehave = function (settings, data, game) {
    
    var wolves = data.Wolves;
    var d = new Date();
    var now = d.getTime();
    var idleActRate = 500; //ms
    var activeActRate = 500; //ms
    var wolf;
    
    for (var i = 0; i < wolves.length; i++){
        wolf = wolves[i];
        if(wolf.pursuing){
            if(wolf.awareOfPlayer(data)){
                if(wolf.timeToAct(now)){
                    wolf.pursue();
                    wolf.nextActionAt = now + activeActRate;
                }
            }
        }
        else if(wolf.timeToAct(now)){
            if(wolf.awareOfPlayer(data)){
                wolf.pursue();
            }
            else if (wolf.hunting){
                wolf.hunt();
            }
            
            else{
                if(d.getTime() % 2){
                    wolf.turn;
                }
                wolf.hunting = false;
                wolf.pursuing = false;
            }
            wolf.nextActionAt = now + idleActRate;
        }
        else{
            wolf.fidget();
        }
    }
    
    };