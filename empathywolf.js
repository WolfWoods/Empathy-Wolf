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


        player.addEventListener('enterframe', function (e) {
            var x = player.x;
            var y = player.y;

            game.keybind(88, 'x');
            game.keybind(90, 'z');

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
                if (!data.map.hitTest(x, y + settings.tileSize) && y + settings.tileSize < settings.MapHeight * settings.tileSize) {
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


            if (game.input.x) // Grab person
            {
                for (var i = 0; i < data.AbandonedPeople.length; i++) {
                    if (data.AbandonedPeople[i].startY * settings.tileSize == player.y) {
                        if (data.AbandonedPeople[i].startX * settings.tileSize >= player.x - 1 && data.AbandonedPeople[i].startX * settings.tileSize <= player.x + 1) {
                            alert("grab");
                            data.PartyPeople.push(data.AbandonedPeople[i]);
                            data.AbandonedPeople.splice(i, 1);
                            game.input.a = null;
                            break;
                        }
                    }
                }

                for (var i = 0; i < data.WoodsPeople.length; i++) {
                    if (data.WoodsPeople[i].startY * settings.tileSize == player.y) {
                        if (data.WoodsPeople[i].startX * settings.tileSize >= player.x - 1 && data.WoodsPeople[i].startX * settings.tileSize <= player.x + 1) {
                            alert("grab");
                            data.PartyPeople.push(data.WoodsPeople[i]);
                            data.WoodsPeople.splice(i, 1);
                            game.input.a = null;
                            break;
                        }
                    }
                }
            }

            if (game.input.z) // Drop person
            {
                if (data.PartyPeople.length > 0) {
                    alert("drop");
                    data.AbandonedPeople.push(data.PartyPeople[data.PartyPeople.length - 1]);
                    data.AbandonedPeople[data.AbandonedPeople.length - 1].startX = player.x / settings.tileSize;
                    data.AbandonedPeople[data.AbandonedPeople.length - 1].startY = player.y / settings.tileSize;
                    data.PartyPeople.splice(data.PartyPeople.length - 1, 1);
                    game.input.b = null;
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
            for (var i = 0; i < data.layers.length; i++) {
                data.layers[i].stage.x = x; //replace with SET VIEW
            }
        });
    }
    game.start();
};