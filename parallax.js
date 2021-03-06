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
        var g = function () {
            //bottom
            data.layers[i].floorSprite = new Sprite((settings.MapLength+100) * settings.tileSize, 600);
            data.layers[i].floorSprite.image = game.assets["img/layer_ground.png"];
            data.layers[i].floorSprite.x = i*-300;
            data.layers[i].floorSprite.y = 400 - settings.tileSize;
            data.layers[i].stage.addChild(data.layers[i].floorSprite);

            //top
            data.layers[i].celingSprite = new Sprite((settings.MapLength+100) * settings.tileSize, 300);
            data.layers[i].celingSprite.image = game.assets["img/layer_ceiling.png"];
            data.layers[i].celingSprite.x = 0;
            data.layers[i].celingSprite.y = -200 + i*50;
            data.layers[i].stage.addChild(data.layers[i].celingSprite);
        }();

        for (var j = 0; j < data.CollisionMatrix[i].length; j++) {
            data.layers[i].spriteList[j] = {
                val: data.CollisionMatrix[i][j]
            };
            //choose tree sprite

            if (data.layers[i].spriteList[j].val === 1) {
                if (j - 2 >= 0 && data.layers[i].spriteList[j - 1].val === 1 && data.layers[i].spriteList[j - 2].val === 1) {
                    data.layers[i].spriteList[j - 2].width = 120;
                    data.layers[i].spriteList[j - 1].width = 0;
                    data.layers[i].spriteList[j].width = 0;
                } else if (j - 1 >= 0 && data.layers[i].spriteList[j - 1].val === 1) {
                    data.layers[i].spriteList[j - 1].width = 80;
                    data.layers[i].spriteList[j].width = 0;
                } else {
                    data.layers[i].spriteList[j].width = 40;
                }
            }
        }

    }

    for (var m = 0; m < data.layers.length; m++) {
        for (var n = 0; n < data.layers[m].spriteList.length; n++) {
            if (data.layers[m].spriteList[n].width === 120) {
                var f = function () {
                    var layerElement = new Sprite(120, 450);
                    layerElement.image = game.assets["img/tree_3wide_split.png"];
                    layerElement.x = n * settings.tileSize;
                    layerElement.y = 0;
                    data.layers[m].stage.addChild(layerElement);
                    data.layers[m].spriteList[n].sprite = layerElement;
                }();
            } else if (data.layers[m].spriteList[n].width === 80) {
                var g = function () {
                    var layerElement = new Sprite(80, 450);
                    if (Math.random() >= 0.5) layerElement.image = game.assets["img/tree_2wide_split.png"];
                    else layerElement.image = game.assets["img/tree_2wide_full.png"];
                    layerElement.x = n * settings.tileSize;
                    layerElement.y = 0;
                    data.layers[m].stage.addChild(layerElement);
                    data.layers[m].spriteList[n].sprite = layerElement;
                }();
            } else if (data.layers[m].spriteList[n].width === 40) {
                var h = function () {
                    var layerElement = new Sprite(40, 450);
                    layerElement.image = game.assets["img/tree_1wide_split.png"];
                    layerElement.x = n * settings.tileSize;
                    layerElement.y = 0;
                    data.layers[m].stage.addChild(layerElement);
                    data.layers[m].spriteList[n].sprite = layerElement;
                }();
            }
        }
    }
}

var setLayers = function (settings, data, game) {

    var newParallaxStage = new Group();

    var backLayer = data.layers[(data.player.y / settings.tileSize) - 1];
    var currentLayer = data.layers[(data.player.y / settings.tileSize)];
    var forwardLayer = data.layers[(data.player.y / settings.tileSize) + 1];

    data.playerGroup = new Group();
    data.playerGroup.addChild(data.player);
    /*for (var i = 0; i < data.PartyPeople.length; i++) {
        var f = function () {
            var partyPerson = new Sprite(40, 450);
            partyPerson.image = game.assets["img/people_man_fat.png"];
            partyPerson.x = data.PartyPeople[i].startX * settings.tileSize;
            partyPerson.y = data.PartyPeople[i].startY * settings.tileSize;
            data.layers[m].stage.addChild(layerElement);
            data.layers[m].spriteList[n].sprite = layerElement;
        }();
    }*/

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
        //else{alert();}


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