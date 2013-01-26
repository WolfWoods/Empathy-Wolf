var parseMapData = function (settings, data) {
    
    settings.MapLength = mapLayout[0].length;
    settings.MapHeight = mapLayout.length;
    
    data.BackgroundSpriteMatrix = []; //sprite data, array of arrays. load one 0 for every time at this point, with each arary of tiles as a parallax
    data.CollisionMatrix = []; //array of arrays. 0 is movable tile, 1 is blocking
    data.WoodsPeople = []; //array of NPCs not yet collected in the woods
    data.PartyPeople = []; //array of NPCs currently in the party
    data.AbandonedPeople = []; //array of NPCs removed from the party
    data.Wolves = []; //array of wolves
    data.PlayerStartX = 0; //player start X coord
    data.PlayerStartY = 0; //player start Y coord
    data.FinishLineX = 0;
    
    for (i = 0; i < settings.MapHeight; i++)
    {
        data.BackgroundSpriteMatrix[i] = [];
        data.CollisionMatrix[i] = [];
        
        for (j = 0; j < settings.MapLength; j++)
        {
            data.BackgroundSpriteMatrix[i][j] = 0;
        
            if (mapLayout[i][j] === "B") //B is Tree
                data.CollisionMatrix[i][j] = 1;
            else
                data.CollisionMatrix[i][j] = 0;
            
            if (mapLayout[i][j] === "C") //C is NPC
                data.WoodsPeople.push({startX: j, startY: i});
                
            if (mapLayout[i][j] === "D") //D is Wolf AWOOOOOOO
                data.Wolves.push({startX: j, startY: i});
                
            if (mapLayout[i][j] === "E") //E is Player Start location
            {
                data.PlayerStartX = j;
                data.PlayerStartY = i;
            }
                
            if (mapLayout[i][j] === "F") //F is the finish line (end of map)
                data.FinishLineX = j;
        }
    }
    
    return settings;
}