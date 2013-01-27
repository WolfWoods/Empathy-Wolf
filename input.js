var setInput = function (settings, data, game){
    var player = data.player;
    player.addEventListener('enterframe', function (e) 
    {
        var x = player.x;
        var y = player.y;

        game.keybind(88, 'x'); // Pick up
        game.keybind(90, 'z'); // Drop


        // Move left
        if (game.input.left) {
            if (!data.map.hitTest(x - settings.tileSize, y)) {
                player.x -= settings.tileSize;
                if (data.facingRight) {
                    player.scale(-1, 1);
                    data.facingRight = !data.facingRight;
                }
                
                // handle party people/player in array
            }
        }


        // Move right
        if (game.input.right) {
            if (!data.map.hitTest(x + settings.tileSize, y)) { 
                player.x += settings.tileSize;
                if (!data.facingRight) {
                    player.scale(-1, 1);
                    data.facingRight = !data.facingRight;
                }
                if (player.x >= data.FinishLineX * settings.tileSize)
                {
                    ShowTitleScreen(data.PartyPeople.length, settings, data, game);
                }
                
                // handle party people/player in array
                
                // handle finish line
            }
        }
    
        // Move up to farther parallax layer
        if (game.input.up) 
        {
            if (!data.map.hitTest(x, y + settings.tileSize) &&
                y + settings.tileSize > settings.tileSize) 
            {
                data.stage.y -= settings.tileSize;
                player.y -= settings.tileSize;
                data.playerGroup.y += settings.tileSize;
                data.mapGroup.y += settings.tileSize;
                setLayers(settings,data,game);
                
                canParallaxShift = true;
                if (data.PartyPeople[0].isPlayer)
                {
                    for (var i = 1; i < data.PartyPeople.length; i++)
                    {
                        if (!data.map.hitTest(data.PartyPeople[i].x, data.PartyPeople[i].y + settings.tileSize) && 
                            data.PartyPeople[i].y + settings.tileSize > settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[i].y -= settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[i]);
                            RemoveFromParty(data.PartyPeople[i], settings, data, game);
                            data.PartyPeople.splice(i, 1);
                        }
                    }
                }
                else if (data.PartyPeople[data.PartyPeople.length - 1].isPlayer)
                {
                    for (var j = data.PartyPeople.length - 1; j >= 0; j--)
                    {
                        if (!data.map.hitTest(data.PartyPeople[j].x, data.PartyPeople[j].y + settings.tileSize) && 
                            data.PartyPeople[j].y + settings.tileSize > settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[j].y -= settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[j]);
                            RemoveFromParty(data.PartyPeople[j], settings, data, game);
                            data.PartyPeople.splice(j, 1);
                        }
                    }
                }
                else
                {
                    playerPosition = 0;
                    var k = 0;
                    for (k = 0; k < data.PartyPeople.length; k++)
                    {
                        if (data.PartyPeople[k].isPlayer)
                        {
                            playerPosition = k;
                            break;
                        }
                    }
                    for (k = playerPosition - 1; k >= 0; k--)
                    {
                        if (!data.map.hitTest(data.PartyPeople[k].x, data.PartyPeople[k].y + settings.tileSize) && 
                            data.PartyPeople[k].y + settings.tileSize > settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[k].y -= settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[k]);
                            RemoveFromParty(data.PartyPeople[k], settings, data, game);
                            data.PartyPeople.splice(k, 1);
                        }
                    }
                    canParallaxShift = true;
                    for (k = playerPosition + 1; k < data.PartyPeople.length; k++)
                    {
                        if (!data.map.hitTest(data.PartyPeople[k].x, data.PartyPeople[k].y + settings.tileSize) && 
                            data.PartyPeople[k].y + settings.tileSize > settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[k].y -= settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[k]);
                            RemoveFromParty(data.PartyPeople[k], settings, data, game);
                            data.PartyPeople.splice(k, 1);
                        }
                    }
                }
            }
        }
    
        // Move down to nearer parallax layer
        if (game.input.down) 
        {
            if (!data.map.hitTest(x, y - settings.tileSize) && 
                y + settings.tileSize < settings.MapHeight * settings.tileSize) 
            {
                data.stage.y += settings.tileSize;
                player.y += settings.tileSize;
                data.playerGroup.y -= settings.tileSize;
                data.mapGroup.y -= settings.tileSize;
                setLayers(settings,data,game);
                
                canParallaxShift = true;
                if (data.PartyPeople[0].isPlayer)
                {
                    for (var i = 1; i < data.PartyPeople.length; i++)
                    {
                        if (!data.map.hitTest(data.PartyPeople[i].x,data.PartyPeople[i].y - settings.tileSize) && 
                            data.PartyPeople[i].y + settings.tileSize < settings.MapHeight * settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[i].y += settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[i]);
                            RemoveFromParty(data.PartyPeople[i], settings, data, game);
                            data.PartyPeople.splice(i, 1);
                        }
                    }
                }
                else if (data.PartyPeople[data.PartyPeople.length - 1].isPlayer)
                {
                    for (var j = data.PartyPeople.length - 1; j >= 0; j--)
                    {
                        if (!data.map.hitTest(data.PartyPeople[j].x,data.PartyPeople[j].y - settings.tileSize) && 
                            data.PartyPeople[j].y + settings.tileSize < settings.MapHeight * settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[j].y += settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[j]);
                            RemoveFromParty(data.PartyPeople[j], settings, data, game);
                            data.PartyPeople.splice(j, 1);
                        }
                    }
                }
                else
                {
                    playerPosition = 0;
                    var k = 0;
                    for (k = 0; k < data.PartyPeople.length; k++)
                    {
                        if (data.PartyPeople[k].isPlayer)
                        {
                            playerPosition = k;
                            break;
                        }
                    }
                    for (k = playerPosition - 1; k >= 0; k--)
                    {
                        if (!data.map.hitTest(data.PartyPeople[k].x,data.PartyPeople[k].y - settings.tileSize) && 
                            data.PartyPeople[k].y + settings.tileSize < settings.MapHeight * settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[k].y += settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[k]);
                            RemoveFromParty(data.PartyPeople[k], settings, data, game);
                            data.PartyPeople.splice(k, 1);
                        }
                    }
                    canParallaxShift = true;
                    for (k = playerPosition + 1; k < data.PartyPeople.length; k++)
                    {
                        if (!data.map.hitTest(data.PartyPeople[k].x,data.PartyPeople[k].y - settings.tileSize) && 
                            data.PartyPeople[k].y + settings.tileSize < settings.MapHeight * settings.tileSize &&
                            canParallaxShift)
                        {
                            data.PartyPeople[k].y += settings.tileSize;
                        }
                        else
                        {
                            canParallaxShift = false;
                            data.AbandonedPeople.push(data.PartyPeople[k]);
                            RemoveFromParty(data.PartyPeople[k], settings, data, game);
                            data.PartyPeople.splice(k, 1);
                        }
                    }
                }
            }
        }

        // Pick up party person
        if (game.input.x) 
        {
            for (var i = 0; i < data.AbandonedPeople.length; i++) {
                if (data.AbandonedPeople[i].startY * settings.tileSize == player.y) {
                    if (data.AbandonedPeople[i].startX * settings.tileSize >= player.x - settings.tileSize && 
                        data.AbandonedPeople[i].startX * settings.tileSize <= player.x + settings.tileSize) 
                    {
                        if (data.facingRight)
                            data.PartyPeople.unshift(data.AbandonedPeople[i]);
                        else
                            data.PartyPeople.push(data.AbandonedPeople[i]);
                        AddToParty(data.AbandonedPeople[i], settings, data, game);
                        data.AbandonedPeople.splice(i, 1);
                        game.input.x = null;
                        break;
                    }
                }
            }

            for (var i = 0; i < data.WoodsPeople.length; i++) {
                if (data.WoodsPeople[i].startY * settings.tileSize == player.y) {
                    if (data.WoodsPeople[i].startX * settings.tileSize >= player.x - settings.tileSize && 
                        data.WoodsPeople[i].startX * settings.tileSize <= player.x + settings.tileSize) 
                    {
                        if (data.facingRight)
                            data.PartyPeople.unshift(data.WoodsPeople[i]);
                        else
                            data.PartyPeople.push(data.WoodsPeople[i]);
                        AddToParty(data.WoodsPeople[i], settings, data, game);
                        data.WoodsPeople.splice(i, 1);
                        game.input.x = null;
                        break;
                    }
                }
            }
        }

        // Drop party person
        if (game.input.z) 
        {
            if (data.PartyPeople.length > 1) {
                data.AbandonedPeople.push(data.PartyPeople[data.PartyPeople.length - 1]);
                RemoveFromParty(data.PartyPeople[data.PartyPeople.length - 1], settings, data, game);
                
                if (data.facingRight)
                    data.PartyPeople.splice(0, 1);
                else
                    data.PartyPeople.splice(data.PartyPeople.length - 1, 1);
                
                game.input.z = null;
            }
        }
    });
}