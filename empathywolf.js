enchant();

window.onload = function () {
    //settings
    var settings = {}, data = {};
    settings.ViewportWidth = 800;
    settings.ViewportHeight = 800;
    settings.tileSize = 40;
    data.facingRight = true;
    parseMapData(settings, data);
    var game = new Game(settings.ViewportWidth, settings.ViewportHeight);
    game.fps = 15;
    game.preload("img/layer_ceiling.png","img/layer_ground.png","img/people_woman_old.png","img/wolf_small.png", "img/banana.png", 'img/background.png', 'map1.gif', 'chara0.gif', "chara1.png", "img/people_man_fat.png", "img/tree_1wide_split.png", "img/tree_3wide_split.png", "img/tree_2wide_split.png", "img/tree_2wide_full.png");

    game.onload = function () {
        
        data.stage = new Group();
        
        data.player = new Sprite(80, 120);
        
        data.background = new Sprite(800,800);
        data.background.image = game.assets['img/background.png'];
        data.background.x = 0;
        data.background.y = 0;
            
        var player = data.player;
        var stage = data.stage;

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
        player.opacity = 0.6;
        data.PartyPeople.push(player);
        player.isPlayer = true;
        data.shownGameOverScreen = false;
        data.parallaxCooldown = 0;

        setInput(settings,data,game);

        loadPeople(settings,data,game);
        loadWolves(settings,data,game);
        
        game.rootScene.addEventListener('enterframe', function (e) {
            wolvesBehave(settings,data,game);
        });
            
        setLayers(settings, data, game);
        
        
        game.rootScene.addEventListener('enterframe', function (e) {
        var x = Math.min((game.width - 40) / 2 - data.player.x, 0);
        x = Math.max(game.width, x + data.map.width) - data.map.width;
        var diff = data.stage.x - x;
        data.stage.x = x;
        data.background.x += diff;
        if (data.parallaxCooldown > 0)
            data.parallaxCooldown--;
        if (data.parallaxCooldown < 0)
            data.parallaxCooldown = 0;
        for (var i = 0; i < data.AbandonedPeople.length; i++)
        {
            data.AbandonedPeople[i].wolfTimer--;
            if (data.AbandonedPeople[i].wolfTimer === 0 && !data.AbandonedPeople[i].dead)
            {
                EatenByWolf(data.AbandonedPeople[i], settings, data, game);  
            }   
        }
    });

        
    }
    game.start();
};