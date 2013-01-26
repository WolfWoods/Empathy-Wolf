var loadMapData = function (settings, data, game){
    var settings.layers = [{
            vpos: 0,
            itemMap: []
        }, {
            vpos: 0,
            itemMap: []
        }, {
            vpos: 0,
            itemMap: []
        }, {
            vpos: 0,
            itemMap: []
        }, {
            vpos: 0,
            itemMap: []
        }];
        currentLayer = layers[0];
        for (var i = 0; i < mapData.length; i++) {
            var f = function () {
                var layerElement = new Sprite(32, 32);
                if (mapData[i] === 0) {
                    layerElement.image = game.assets["chara0.gif"];
                    layerElement.x = i * 32;
                    layerElement.y = 0;
                    layerElement.frame = 5;
                } else if (mapData[i] === 0) {
                    layerElement.image = game.assets["chara1.png"];
                    layerElement.x = i * 32;
                    layerElement.y = i * 32;
                    layerElement.frame = 5;
                }
                currentLayer.itemMap.push(layerElement);
                game.rootScene.addChild(layerElement);
            }();
        }
}