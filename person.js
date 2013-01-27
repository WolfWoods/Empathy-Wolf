var AddToParty = function (person, direction, settings, data, game)
    {
        person.wolfTimer = -1;
        
        if (!data.facingRight)
        {
            person.x = data.PartyPeople[data.PartyPeople.length - 1].x + settings.tileSize);
            person.scale(-1, 1);
        }
        else
            person.x = data.PartyPeople[0].x - settings.tileSize);
    }
    
var RemoveFromParty = function (person, settings, data, game)
    {
        person.startX = person.x;
        person.startY = person.y;
        
        person.wolfTimer = game.fps * Math.floor(Math.random() * (15 - 7) + 7);
        person.addEventListener('enterframe', function (e) 
        {
            person.wolfTimer--;
            if (person.wolfTimer === 0 && !person.dead)
            {
                EatenByWolf(person, settings, data, game);  
                return;
            }
        });
    } 
    
var EatenByWolf = function (person, settings, data, game)
    {
        for (var i = 0; i < data.AbandonedPeople.length; i++)
        {
            if (person.personID === data.AbandonedPeople[i].personID)
            {
                data.AbandonedPeople[i].dead = true;
                data.AbandonedPeople.splice(i,1);
                break;
            }
        }
        alert("EATED! AWOOOOOO!");
    }