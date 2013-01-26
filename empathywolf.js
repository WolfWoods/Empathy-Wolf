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
    game.preload('map1.gif', 'chara0.gif', "chara1.png", "img/people_man_fat.png");

    game.onload = function () {
        loadMapData(settings, data, game);

        data.map = new Map(40, 40);
        data.map.image = game.assets['map1.gif'];
        data.map.loadData(data.BackgroundSpriteMatrix);
        data.map.collisionData = data.CollisionMatrix;

        var bear = new Sprite(80, 120);
        bear.image = game.assets["img/people_man_fat.png"];
        bear.x = data.PlayerStartX * settings.tileSize;
        bear.y = data.PlayerStartY * settings.tileSize;
        //game.rootScene.addChild(bear);


        bear.addEventListener('enterframe', function (e) {
            var x = bear.x;
            var y = bear.y;
            if (game.input.left) {
                if (!data.map.hitTest(x - settings.tileSize, y)) 
                {
                    bear.x -= settings.tileSize;
                    if (data.facingRight) {
                        bear.rotate(180);
                        data.facingRight = !data.facingRight;
                    }
                }
            }

            if (game.input.right) {
                if (!data.map.hitTest(x + settings.tileSize, y)) {
                    bear.x += settings.tileSize;
                    if (!data.facingRight) {
                        bear.rotate(180);
                        data.facingRight = !data.facingRight;
                    }
                }
            }

        });
        
        var stage = new Group();
        stage.addChild(data.map);
        stage.addChild(bear);
        game.rootScene.addChild(stage);
    };
    game.start();
};