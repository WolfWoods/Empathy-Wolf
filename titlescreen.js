var ShowTitleScreen = function (numSaved, settings, data, game)
{
    if (numSaved <= -1)
    {
        // Start screen   
    }
    else if (numSaved == 0)
    {
        alert("You got chomped by a wolf! AWOOOOO");
        // Player killed by wolf
        // Fin screen without score
    }
    else
    {
        alert("You saved " + (numSaved - 1) + " party people! You are an empathy master!");
        // Player escaped
        // Fin screen with score (if have time: diff messages rating player on empathy/wolf based on numSaved
    }
}