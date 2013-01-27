var parallaxAnimate = function (settings, data, game){
    var d = new Date();
    var now = d.getTime();
    var delay = 300;
    while(d.getTime() < now + delay){
        
        
    }
    
}

var setTreeOpacity = function (layer, opacity) {
    for(var i = 0; i < layer.spriteList.length; i++){
        if(layer.spriteList[i] && layer.spriteList[i].sprite)
        layer.spriteList[i].sprite.opacity = opacity;
    }
}