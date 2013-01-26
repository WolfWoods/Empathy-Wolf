function onLoad() {
var ship= new Image('img/starship.png');
ship.tick = function(){ // Spaceship will follow your cursor
this.x += (mouseX-this.x)/10;
this.y += (mouseY-this.y)/10;
};

ship.onHit = function(){ // Crashed!
alert("CRASHED!");
}

for(i=0;i<10;i++){
rock = new Image('img/rock.png');
rock.x = Math.random()*320;
rock.y = Math.random()*480;
}
gameStart();
}