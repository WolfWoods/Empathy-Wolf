var parseMapData = function (settings, data) {
    settings.MapLength = 0;
    data.BackgroundSpriteMatrix = [[0,0,0],[0,0,0],[0,0,0]]; //sprite data, array of arrays. load one 0 for every time at this point, with each arary of tiles as a parallax
    data.CollisionMatrix = [[0,0,1],[0,1,0],[1,0,0]]; //array of arrays. 0 is movable tile, 1 is blocking
    
    //logic
    
    return settings
}