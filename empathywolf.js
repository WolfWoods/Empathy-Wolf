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

        game.keybind(88, 'a'); //X
        game.keybind(90, 'b'); //Z
        //game.keybind(89, 'c');
            
        bear.addEventListener('enterframe', function (e) {
            var x = bear.x;
            var y = bear.y;

            //if (game.input.c)
              //  alert("C");
            
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
            
            if (game.input.a) // Grab person
            {
                for (var i = 0; i < data.AbandonedPeople.length; i++)
                {
                    if (data.AbandonedPeople[i].startY * settings.tileSize == bear.y)
                    {
                        if (data.AbandonedPeople[i].startX * settings.tileSize >= bear.x - 1 &&
                            data.AbandonedPeople[i].startX * settings.tileSize <= bear.x + 1)
                        {
                            alert("grab");
                            data.PartyPeople.push(data.AbandonedPeople[i]);
                            data.AbandonedPeople.splice(i,1);
                            game.input.a = null;
                            break;
                        }
                    }
                }
                
                for (var i = 0; i < data.WoodsPeople.length; i++)
                {
                    if (data.WoodsPeople[i].startY * settings.tileSize == bear.y)
                    {
                        if (data.WoodsPeople[i].startX * settings.tileSize >= bear.x - 1 &&
                            data.WoodsPeople[i].startX * settings.tileSize <= bear.x + 1)
                        {
                            alert("grab");
                            data.PartyPeople.push(data.WoodsPeople[i]);
                            data.WoodsPeople.splice(i,1);
                            game.input.a = null;
                            break;
                        }
                    }
                }
            }
            
            if (game.input.b) // Drop person
            {
                if (data.PartyPeople.length > 0)
                {
                    alert("drop");
                    data.AbandonedPeople.push(data.PartyPeople[data.PartyPeople.length - 1]);
                    data.AbandonedPeople[data.AbandonedPeople.length - 1].startX = bear.x / settings.tileSize;
                    data.AbandonedPeople[data.AbandonedPeople.length - 1].startY = bear.y / settings.tileSize;
                    data.PartyPeople.splice(data.PartyPeople.length - 1, 1);
                    game.input.b = null;
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