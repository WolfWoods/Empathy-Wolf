var AddToParty = function (person, direction, settings, data, game)
    {
        person.wolfTimer = -1;
        // Put new addition on appropriate side based on facing direction.  
        // New x is tilesize * partypeople.length
    }
    
var RemoveFromParty = function (person, settings, data, game)
    {
        person.startX = person.x;
        person.startY = person.y;
        
        person.wolfTimer = game.fps * Math.floor(Math.random() * (15 - 7) + 7);
        person.addEventListener('enterframe', function (e) 
        {
            person.wolfTimer--;
            if (person.wolfTimer == 0)
            {
                EatenByWolf(person, settings, data, game);  
                return;
            }
        });
    } 
    
var EatenByWolf = function (person, settings, data, game)
    {
        alert("EATED! AWOOOOOO!"
    }