var ShowTitleScreen = function (numSaved, settings, data, game)
{
    if (numSaved <= -1)
    {
        // Start screen   
    }
    else if (numSaved == 0)
    {
        if (!data.shownGameOverScreen)
        {
            alert("You got chomped by a wolf! AWOOOOO");
            data.shownGameOverScreen = true;
        }
        // Player killed by wolf
        // Fin screen without score
    }
    else
    {
        if (!data.shownGameOverScreen)
        {
            alert("You saved " + (numSaved - 1) + " party people! You are an empathy master!");
            data.shownGameOverScreen = true;
        }
        // Player escaped
        // Fin screen with score (if have time: diff messages rating player on empathy/wolf based on numSaved
    }
}