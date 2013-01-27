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
        
        data.stage = new Group();
        data.stage.y = 250;
        data.player = new Sprite(80, 120);
        
        var stage = data.stage;
        var player = data.player;

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


        setInput(settings, data, game);


        stage.addChild(data.map);
        stage.addChild(player);
        game.rootScene.addChild(stage);
        loadParallax(settings, data, game);

        game.rootScene.addEventListener('enterframe', function (e) {
            var x = Math.min((game.width - 40) / 2 - player.x, 0);
            x = Math.max(game.width, x + data.map.width) - data.map.width;
            stage.x = x;
            for (var i = 0; i < data.layers.length; i++) {
                data.layers[i].stage.x = x; //replace with SET VIEW
            }
        });
    }
    game.start();
};