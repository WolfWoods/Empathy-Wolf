var loadMapData = function (settings, data, game){
    data.layers = [{
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
        data.currentLayer = data.layers[0];
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
                data. currentLayer.itemMap.push(layerElement);
                game.rootScene.addChild(layerElement);
            }();
        }
    
     var map = new Map(16,16);
        map.loadData(mapData);
        scene.addChild(map);
}