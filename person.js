var loadPeople = function (settings, data, game){
    for (var i = 0; i < data.WoodsPeople.length; i++) {
            data.WoodsPeople[i].sprite = new Sprite(80, 120);
            data.WoodsPeople[i].sprite.image = game.assets["img/people_woman_old.png"];
            data.WoodsPeople[i].sprite.x = data.WoodsPeople[i].startX * settings.tileSize;
            data.WoodsPeople[i].sprite.y = 325;
            data.layers[data.WoodsPeople[i].startY].stage.addChild(data.WoodsPeople[i].sprite);
            var sprite = {val:0,sprite:data.WoodsPeople[i].sprite};
            data.layers[data.WoodsPeople[i].startY].spriteList.push(sprite);
    }
}

var AddToParty = function (person, settings, data, game)
    {
        person.wolfTimer = -1;
        
        if (!data.facingRight)
        {
            person.x = data.PartyPeople[data.PartyPeople.length - 1].sprite.x + settings.tileSize;
            person.sprite.scale(-1, 1);
        }
        else
            person.x = data.PartyPeople[0].sprite.x - settings.tileSize;
        person.y = person.startY * settings.tileSize;
    }
    
var RemoveFromParty = function (person, settings, data, game)
    {
        person.startX = person.x;
        person.startY = person.y / settings.tileSize;
        
        person.wolfTimer = game.fps * Math.floor(Math.random() * (15 - 7) + 7);
    } 
    
var EatenByWolf = function (person, settings, data, game)
    {
        for (var i = 0; i < data.AbandonedPeople.length; i++)
        {
            if (person.personID === data.AbandonedPeople[i].personID)
            {
                data.AbandonedPeople[i].dead = true;
                data.AbandonedPeople[i].sprite.rotate(90);
                data.AbandonedPeople.splice(i,1);
                break;
            }
        }
    }