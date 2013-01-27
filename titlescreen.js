var ShowTitleScreen = function (numSaved, settings, data, game)
{
    if (numSaved == -1)
    {
        // Start screen   
    }
    else if (numSaved == 0)
    {
        // Player killed by wolf
        // Fin screen without score
    }
    else
    {
        alert("Saved " + numSaved - 1 + " party people!");
        // Player escaped
        // Fin screen with score
    }
}