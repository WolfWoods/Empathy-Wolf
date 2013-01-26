var parseMapData = function (settings, data) {
    settings.MapLength = 0;
    settings.MapHeight = 0;
    data.BackgroundSpriteMatrix = []; //sprite data, array of arrays. load one 0 for every time at this point, with each arary of tiles as a parallax
    
    data.CollisionMatrix = []; //array of arrays. 0 is movable tile, 1 is blocking
    for (i = 0; i < settings.MapHeight; i++)
        data.CollisionMatrix[i] = [];
            
    //logic
    
    return settings
}