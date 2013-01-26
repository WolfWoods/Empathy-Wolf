var loadMapData = function (settings, data, game){
    data.layers = data.layers || [];
    for(var i = 0; i < data.CollisionMatrix.length; i++){
        data.layers[i] = {vpos:i, spriteList:[] };
        for(var j = 0; j < data.CollisionMatrix[i].length; j++){
            data.layers[i].spriteList[j] = {val:data.CollisionMatrix[i][j]};
            //choose tree sprite
            var layerElement = new Sprite(32, 32);
                if (data.layers[i].spriteList[j].val === 0) {
                    layerElement.image = game.assets["chara0.gif"];
                    layerElement.x = j * 32;
                    layerElement.y = i * 32; //will eventually need to be viewport sized
                    layerElement.frame = 5;
                } else if (data.layers[i].spriteList[j].val === 1) {
                    layerElement.image = game.assets["chara1.png"];
                    layerElement.x = j * 32;
                    layerElement.y = i * 32;
                    layerElement.frame = 5;
                }
                data.layers[i].spriteList[j].sprite =layerElement;
                game.rootScene.addChild(layerElement);
        }
    }

    
        var map = new Map(16,16);
        map.loadData(data.BackgroundSpriteMatrix, data.CollisionMatrix);
        scene.addChild(map);
}