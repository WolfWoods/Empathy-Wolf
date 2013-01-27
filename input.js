var setInput = function (settings, data, game){
    var player = data.player;
    player.addEventListener('enterframe', function (e) {
            var x = player.x;
            var y = player.y;

            game.keybind(88, 'x');
            game.keybind(90, 'z');

            if (game.input.left) {
                if (!data.map.hitTest(x - settings.tileSize, y)) {
                    player.x -= settings.tileSize;
                    if (data.facingRight) {
                        player.scale(-1, 1);
                        data.facingRight = !data.facingRight;
                    }
                }
            }

            if (game.input.right) {
                if (!data.map.hitTest(x + settings.tileSize, y)) {
                    player.x += settings.tileSize;
                    if (!data.facingRight) {
                        player.scale(-1, 1);
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
                        if (data.AbandonedPeople[i].startX * settings.tileSize >= player.x - settings.tileSize && 
                            data.AbandonedPeople[i].startX * settings.tileSize <= player.x + settings.tileSize) {
                            alert("grab");
                            data.PartyPeople.push(data.AbandonedPeople[i]);
                            data.AbandonedPeople.splice(i, 1);
                            game.input.x = null;
                            break;
                        }
                    }
                }

                for (var i = 0; i < data.WoodsPeople.length; i++) {
                    if (data.WoodsPeople[i].startY * settings.tileSize == player.y) {
                        if (data.WoodsPeople[i].startX * settings.tileSize >= player.x - settings.tileSize && 
                            data.WoodsPeople[i].startX * settings.tileSize <= player.x + settings.tileSize) {
                            alert("grab");
                            data.PartyPeople.push(data.WoodsPeople[i]);
                            data.WoodsPeople.splice(i, 1);
                            game.input.x = null;
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
                    game.input.z = null;
                }
            }
        });
}