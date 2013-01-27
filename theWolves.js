var loadWolves = function (settings, data, game) {
    var wolves = data.Wolves;
    var d = new Date();
    
    for (var i = 0; i < wolves.length; i++) {

        wolves[i].sprite = new Sprite(215, 86);
        wolves[i].sprite.image = game.assets["img/wolf_small.png"];
        wolves[i].sprite.x = wolves[i].startX * settings.tileSize;
        wolves[i].sprite.y = 365;
        data.layers[0].stage.addChild(wolves[i].sprite);
        
        wolves[i].facingRight = true;
        wolves[i].nextActionAt = d.getTime();
        
        wolves[i].timeToAct = function () {
            if(d.getTime() > wolves[i].nextActionAt){
                return true;
            }
            else{
                return false;
            }
        }; 
        
        wolves[i].pursue = function () {
            var wolf = this.sprite;
        };
        wolves[i].turn = function () {
            var wolf = this.sprite;
        };
        wolves[i].awareOfPlayer = function () {
            var wolf = this.sprite;
        };
        wolves[i].fidget = function () {
            var wolf = this.sprite;
            if(wolf.facingRight){
                wolf.x += 10
            }
            else{
                wolf.x -= 10
            }
                
        };
        wolves[i].hunt = function () {
            var wolf = this.sprite;
        };
    }
}

    
var wolvesBehave = function () {
    var d = new Date();
    var now = d.getTime();
    var actRate = 500; //ms
    var wolf;
    
    for (var i = 0; i < wolves.length; i++){
        wolf = wolves[i];
        if(wolf.pursuing){
            if(wolf.awareOfPlayer){
                
            }
        }
        else if(wolf.timeToAct){
            if(wolf.awareOfPlayer){
                wolf.pursue();
            }
            else if (wolf.hunting){
                wolf.hunt();
            }
            else{
                if(now % 2){
                    wolf.turn;
                }
                wolf.hunting = false;
                wolf.awareOfPlayer = false;
            }
            wolf.nextActionAt = now + actRate;
        }
        else{
            wolf.fidget();
        }
    }
    
    };