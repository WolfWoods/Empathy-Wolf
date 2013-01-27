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

var setLayers = function (settings, data, game) {

    var newParallaxStage = new Group();

    var backLayer = data.layers[(data.player.y / settings.tileSize) - 1];
    var forwardLayer = data.layers[(data.player.y / settings.tileSize) + 1];

    data.playerGroup = new Group();
    data.playerGroup.addChild(data.player);
    data.mapGroup = new Group();
    data.mapGroup.addChild(data.map);

    if (typeof backLayer !== 'undefined') {
        //final states
        setTreeOpacity(backLayer, 0.5);
        data.backParallax = backLayer.stage;
        //scale
        data.backParallax.scaleX = 0.5;
        data.backParallax.scaleX = 0.5;
        //offset
        data.backParallax.y += -50;

        
    } else {
        data.backParallax = new Group();
    }
    data.currentParallax = data.layers[(data.player.y / settings.tileSize)].stage;
    if (typeof forwardLayer !== 'undefined') {
        //final states
        setTreeOpacity(forwardLayer, 0.5);
        data.forwardParallax = forwardLayer.stage;
        data.forwardParallax.scaleX = 2;
        data.forwardParallax.scaleX = 2;
        //offset
        data.forwardParallax.y += 50;

    } else {
        data.backParallax = new Group();
    }

    data.playerGroup.y = data.playerGroup.y + 250;
    data.mapGroup.y = data.mapGroup.y + 250;


    //data.stage = new Group();
    //map
    newParallaxStage.addChild(data.mapGroup);
    //background
    newParallaxStage.addChild(data.background);
    //parallax background
    newParallaxStage.addChild(data.backParallax);
    //player
    newParallaxStage.addChild(data.playerGroup);
    //parallax current
    newParallaxStage.addChild(data.currentParallax);
    //parallax foreground
    newParallaxStage.addChild(data.forwardParallax);

    //animate


    if (data.parallaxStage) {
        data.stage.removeChild(data.parallaxStage);
    }
    data.parallaxStage = newParallaxStage;
    data.stage.addChild(data.parallaxStage);
    game.rootScene.removeChild(data.stage);
    game.rootScene.addChild(data.stage);



}