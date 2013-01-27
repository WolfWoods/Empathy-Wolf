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
                val: data.CollisionMatrix[i][j],
                floorSprite: {},
                celingSprite: {}
            };
            //choose tree sprite

            if (data.layers[i].spriteList[j].val === 1) {
                var f = function () {
                    var layerElement = new Sprite(40, 450);
                    layerElement.image = game.assets["img/tree_1wide_split.png"];
                    layerElement.x = j * settings.tileSize;
                    layerElement.y = 0;
                    data.layers[i].stage.addChild(layerElement);
                    data.layers[i].spriteList[j].sprite = layerElement;
                }();
            }

        }
var g = function () {
                //bottom
                data.layers[i].floorSprite = new Sprite(settings.MapLength * settings.tileSize, settings.tileSize);
                data.layers[i].floorSprite.image = game.assets["img/banana.png"];
                data.layers[i].floorSprite.x = 0;
                data.layers[i].floorSprite.y = 450 - settings.tileSize;
                data.layers[i].stage.addChild(data.layers[i].floorSprite);

                //top
                data.layers[i].celingSprite = new Sprite(settings.MapLength * settings.tileSize, settings.tileSize);
                data.layers[i].celingSprite.image = game.assets["img/banana.png"];
                data.layers[i].celingSprite.x = 0;
                data.layers[i].celingSprite.y = 0;
                data.layers[i].stage.addChild(data.layers[i].celingSprite);
            }();
    }
}

var setLayers = function (settings, data, game) {

    var newParallaxStage = new Group();

    var backLayer = data.layers[(data.player.y / settings.tileSize) - 1];
    var currentLayer = data.layers[(data.player.y / settings.tileSize)];
    var forwardLayer = data.layers[(data.player.y / settings.tileSize) + 1];

    data.playerGroup = new Group();
    data.playerGroup.addChild(data.player);
    data.mapGroup = new Group();
    data.mapGroup.addChild(data.map);

    if (typeof backLayer !== 'undefined') {
        //final states
        //opacity
        setTreeOpacity(backLayer, 0.3);
        data.backParallax = backLayer.stage;
        //scale
        data.backParallax.scaleX = 1;
        data.backParallax.scaleY = 0.75;
        //offset
        if (!data.backParallaxOffsetApplied) {
            data.backParallax.y += -0;
            data.backParallaxOffsetApplied = true;
        }


    } else {
        data.backParallax = new Group();
    }

    //opacity
    setTreeOpacity(currentLayer, 0.6);
    data.currentParallax = currentLayer.stage;
    data.currentParallax.scaleX = 1;
    data.currentParallax.scaleY = 1;
    //offset
    if (!data.currentParallaxOffsetApplied) {
        data.currentParallax.y += 0;
        data.currentParallaxOffsetApplied = true;
    }


    if (typeof forwardLayer !== 'undefined') {
        //final states
        //opacity
        setTreeOpacity(forwardLayer, 1);
        data.forwardParallax = forwardLayer.stage;
        //scale
        data.forwardParallax.scaleX = 1;
        data.forwardParallax.scaleY = 1.25;
        //offset
        if (!data.forwardParallaxOffsetApplied) {
            data.forwardParallax.y += 0;
            data.forwardParallaxOffsetApplied = true;
        }

    } else {
        data.backParallax = new Group();
    }

    //fix map relative to player
    data.playerGroup.y = data.playerGroup.y + 250;
    data.mapGroup.y = data.mapGroup.y + 250;


    //fix player shift
    data.playerGroup.y += settings.MapHeight * settings.tileSize - data.player.y

    //fix player to tree height
    data.playerGroup.y = data.playerGroup.y - 3 * settings.tileSize;

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