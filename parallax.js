var processParallax = function (settings, data, game) {
    /*data.layers = [];
    for (var i = 0; i < data.CollisionMatrix.length; i++) {
        var f = function () {
            var pxStage = new Group();
            data.layers[i] = pxStage;
            for (var j = 0; j < data.CollisionMatrix[i].length; j++) {
                if (data.CollisionMatrix[i][j]) {
                    var g = function () {
                        var item = new Sprite(40, 40);
                        item.image = game.assets["img/tree_1wide_split.png"];
                        item.x = j * settings.tileSize;
                        item.y = i * settings.tileSize;
                        data.layers[i].addChild(item);
                    }();
                }
            }
        }();
    }*/

    data.layers = data.layers || [];
    for (var i = 0; i < data.CollisionMatrix.length; i++) {
        data.layers[i] = {
            vpos: i,
            spriteList: [],
            stage: new Group()
        };
        for (var j = 0; j < data.CollisionMatrix[i].length; j++) {
            data.layers[i].spriteList[j] = {
                val: data.CollisionMatrix[i][j]
            };
            //choose tree sprite

            if (data.layers[i].spriteList[j].val === 1) {
                var f = function () {
                    var layerElement = new Sprite(40, 450);
                    layerElement.image = game.assets["img/tree_1wide_split.png"];
                    layerElement.x = j * settings.tileSize;
                    layerElement.y = i * 3;
                    data.layers[i].stage.addChild(layerElement);
                    data.layers[i].spriteList[j].sprite = layerElement;
                }();
            }
        }
        
    }
}
    
var setLayers = function (settings, data, game){
    
    //map
    data.stage.addChild(data.map);
    //background
    data.stage.addChild(data.background);
    //parallax background
    data.stage.addChild(
        data.layers[(data.player.y/settings.tileSize)-1].stage);
    //player
    data.stage.addChild(data.player);
    //parallax current
    data.stage.addChild(
        data.layers[(data.player.y/settings.tileSize)].stage);
    //parallax foreground
    data.stage.addChild(
        data.layers[(data.player.y/settings.tileSize)-1].stage);
    
    game.rootScene.addChild(data.stage);
    
}
    
var parallaxForward = function (settings, data, game){
    var newBack, newFront, newCenter;
    //newCenter =
}
    
var parallaxBack = function (settings, data, game){
    
}