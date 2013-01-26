enchant();

window.onload = function () {
    //settings
    var settings = {}, data = {};
    settings.ViewportWidth = 800;
    settings.ViewportHeight = 600;
    settings.tileSize = 40;
    data.facingRight = true;
    parseMapData(settings, data);
    var game = new Game(settings.ViewportWidth, settings.ViewportHeight);
    game.fps = 15;
    game.preload('map1.gif', 'chara0.gif', "chara1.png", "img/people_man_fat.png", "img/tree_1wide_split.png");

    game.onload = function () {
        var stage = new Group();
        stage.y = 250;
        var player = new Sprite(80, 120);

        //load map data
        data.map = new Map(16, 16);
        data.map.image = game.assets['map1.gif'];
        data.map.loadData(data.BackgroundSpriteMatrix);
        data.map.collisionData = data.CollisionMatrix;

        processParallax(settings, data, game);

        data.map = new Map(40, 40);
        data.map.image = game.assets['map1.gif'];
        data.map.loadData(data.BackgroundSpriteMatrix);
        data.map.collisionData = data.CollisionMatrix;


        player.image = game.assets["img/people_man_fat.png"];
        player.x = data.PlayerStartX * settings.tileSize;
        player.y = data.PlayerStartY * settings.tileSize;
        //game.rootScene.addChild(bear);



        player.addEventListener('enterframe', function (e) {
            var x = player.x;
            var y = player.y;
            if (game.input.left) {
                if (!data.map.hitTest(x - settings.tileSize, y)) {
                    player.x -= settings.tileSize;
                    if (data.facingRight) {
                        player.rotate(180);
                        data.facingRight = !data.facingRight;
                    }
                }
            }

            if (game.input.right) {
                if (!data.map.hitTest(x + settings.tileSize, y)) {
                    player.x += settings.tileSize;
                    if (!data.facingRight) {
                        player.rotate(180);
                        data.facingRight = !data.facingRight;
                    }
                }
            }
            if (game.input.up) {
                if (!data.map.hitTest(x, y + settings.tileSize) && y + settings.tileSize < settings.MapHeight * settings.tileSize ) {
                    stage.y -= settings.tileSize;
                    player.y += settings.tileSize;
                }
            }
            if (game.input.down) {
                if (!data.map.hitTest(x, y - settings.tileSize) && y + settings.tileSize > settings.tileSize) {
                    stage.y += settings.tileSize;
                    player.y -= settings.tileSize;
                }
            }

        });
          

        stage.addChild(data.map);
        stage.addChild(player);
        game.rootScene.addChild(stage);
        loadParallax(settings, data, game);
            
        game.rootScene.addEventListener('enterframe', function (e) {
            var x = Math.min((game.width - 40) / 2 - player.x, 0);
            x = Math.max(game.width, x + data.map.width) - data.map.width;
            stage.x = x;
            for(var i = 0; i < data.layers.length; i++){
                data.layers[i].stage.x = x; //replace with SET VIEW
            }
        });
    };
    game.start();
};