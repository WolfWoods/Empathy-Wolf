enchant();

window.onload = function () {
    //settings
    var settings, worldObjects, loadedMap;
    settings.ViewportHeight = 32;
    parseMapData(settings);
    var game = new Game(settings.MapLength, settings.ViewportHeight);
    game.fps = 15;
    game.preload("chara1.png");
    game.preload("chara0.gif");
    game.onload = function () {

        var layers = [{
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
        var map = new Map(16,16);
        map.loadData(mapData);
        scene.adChild(map);

        var player = new Sprite(32, 32);
        player.x = 0;
        player.y = 0;
        
        var image = new Surface(96, 128);
        image.draw(game.assets['chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
        player.image = image;
        
        player.isMoving = false;
        player.direction = 0;
        player.walk = 1;
        player.addEventListener('enterframe', function() {
            this.frame = this.direction * 3 + this.walk;
            if (this.isMoving) {
                this.moveBy(this.vx, 0);
 
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
                if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                    this.isMoving = false;
                    this.walk = 1;
                }
            } else {
                this.vx = this.vy = 0;
                if (game.input.left) {
                    this.direction = 1;
                    this.vx = -4;
                } else if (game.input.right) {
                    this.direction = 2;
                    this.vx = 4;
                } else if (game.input.up) {
                    this.direction = 3;
                    this.vy = -4;
                } else if (game.input.down) {
                    this.direction = 0;
                    this.vy = 4;
                }
                if (this.vx || this.vy) {
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                        this.isMoving = true;
                        arguments.callee.call(this);
                    }
                }
            }
        });
    };
    game.start();
};