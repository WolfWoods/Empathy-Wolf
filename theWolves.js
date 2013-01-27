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
        }; // time + delay
        
        wolves[i].pursue = function () {};
        wolves[i].turn = function () {};
        wolves[i].awareOfPlayer = function () {};
        wolves[i].fidget = function () {};
    }
}

    
var wolvesBehave = function () {
    var d = new Date();
    var now = d.getTime();
    var wolf;
    
    for (var i = 0; i < wolves.length; i++){
        wolf = wolves[i];
        if(wolf.timeToAct){
            if(wolf.awareOfPlayer){
            }
        }
        else{
            wolf.fidget();
        }
    }
    
    };