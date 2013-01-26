//npaka氏のmario.jsをもとに改造
//http://www.saturn.dti.ne.jp/~npaka/ajax/mariojs/index.html

var Sprites = new Array();

var isIE=document.documentElement.getAttribute("style")==document.documentElement.style;
var log = document.getElementById("log");

//====================
//ラベル
//====================
//コンストラクタ
function Label(text,x,y) {
    this.text    =text;
    this.x       =x;
    this.y       =y;
    this.color   ="#000000";
    this.fontSize=12;
    this.node=document.createElement("span");
    this.node.appendChild(document.createTextNode(text));
    this.node.setAttribute("style",
        "position:absolute;"+
        "font-family:monospace;");
   getElement("canvas0").appendChild(this.node);
    this.update();
}

//テキストの指定
Label.prototype.setText=function(text) {
    this.text=text;
    this.node.replaceChild(document.createTextNode(text),this.node.firstChild);
    this.update();
}

//XY座標の指定
Label.prototype.setXY=function(x,y) {
    this.x=x;
    this.y=y;
    this.update();
}

//色の指定
Label.prototype.setColor=function(red,green,blue) {
    this.color=rgb2str(red,green,blue);
    this.update();
}

//フォントサイズの指定
Label.prototype.setFontSize=function(fontSize) {
    this.fontSize=fontSize;
    this.update();
}

//更新
if (isIE) {
    Label.prototype.update=function() {
        var cssText=
            "position:absolute;"+
            "font-family:monospace;"+
            "color:"    +this.color+";"+
            "font-size:"+this.fontSize+"px;"+
            "left:"     +this.x+"px;"+
            "top:"      +this.y+"px;";
        this.node.style.cssText=cssText;
    }
} else {
    Label.prototype.update=function() {
        var style=this.node.style;
        style.color   =this.color;
        style.fontSize=this.fontSize+"px";
        style.left    =this.x+"px";
        style.top     =this.y+"px";
    }
}

//====================
//矩形
//====================
//コンストラクタ
function Rectangle(x,y,w,h) {
    this.x    =x;
    this.y    =y;
    this.w    =w;
    this.h    =h;
    this.color="#000000";
    this.node=document.createElement("span");
    this.node.setAttribute("style",
        "position:absolute;");
    getElement("canvas").insertBefore(
        this.node,getElement("canvas").firstChild );
    this.update();
}

//XY座標の指定
Rectangle.prototype.setXY=function(x,y) {
    this.x=x;
    this.y=y;
    this.update();
}

//幅の指定
Rectangle.prototype.setWidth=function(w) {
    this.w=w;
    this.update();
}

//高さの指定
Rectangle.prototype.setHeight=function(h) {
    this.h=h;
    this.update();
}

//色の指定
Rectangle.prototype.setColor=function(red,green,blue) {
    this.color=rgb2str(red,green,blue);
    this.update();
}

//更新
if (isIE) {
    Rectangle.prototype.update=function(){
        var cssText=
            "position:absolute;"+
            "background-color:"+this.color+";"+
            "left:"            +this.x+"px;"+
            "top:"             +this.y+"px;"+
            "width:"           +this.w+"px;"+
            "height:"          +this.h+"px";
        this.node.style.cssText = cssText;
    }
} else {
    Rectangle.prototype.update=function(){
        var style=this.node.style;
        style.backgroundColor=this.color;
        style.left           =this.x+"px";
        style.top            =this.y+"px";
        style.width          =this.w+"px";
        style.height         =this.h+"px";
    }
}


//====================
//イメージ
//====================
//コンストラクタ
function Image(src,x,y,w,h) {
	if(!x)x=160;
	if(!y)y=240;
    this.x=x;
	this.y=y;
	if(!w)w=32;
	if(!h)h=32;
	this.w=w;
	this.h=h;
    this.ix=0;
    this.iy=0;
    this.direction=1;
    this.deg=0;
	this.node=document.createElement("div") ;
	this.image=document.createElement("img") ;
	this.image.setAttribute("src",src);
	this.node.appendChild(this.image);
    this.node.setAttribute("style","position:absolute;");
	getElement("canvas0").appendChild(this.node);
	Sprites.push(this);
  	this.update();
}

//XY座標の指定
Image.prototype.setXY=function(x,y) {
    this.x=x;
    this.y=y;
    this.update();
}

Image.prototype.setBounds=function(w,h){
    this.w=w;
    this.h=h;
    this.update();
}

Image.prototype.setRotate=function(deg){
    deg=Math.floor(-85 + deg);
    if(deg < -85) deg = -85;
    else if(deg > 0) deg = 0;
    this.deg = deg;
    this.update();
}

//更新
if (isIE) {

    Image.prototype.update=function(){
	var cssText=
			"overflow:hidden;"+
            "position:absolute;"+
            "left:"+this.x+"px;"+
            "top:" +this.y+"px;";
        this.node.style.cssText=cssText;
        this.node.width = this.w;
        this.node.height = this.h;
    }
} else {
    Image.prototype.update=function(){
	var cssText=
			"-webkit-Transform:scale("+this.direction+",1);"+
			"overflow:hidden;"+
			"position:absolute;"+
			"width:"+this.w+"px;"+
			"height:"+this.h+"px;"+
            "left:"+this.x+"px;"+
            "top:" +this.y+"px;";
		this.node.width = this.w;
		this.node.height = this.h;
		this.node.setAttribute("style",cssText);
		this.image.setAttribute("style","position:absolute;left:"+this.ix+
										"px;top:"+this.iy+"px");
										
			}
}


Image.prototype.isHit=function(obj) {
	if(!this.x)return false;
	var dx = Math.abs(obj.x - this.x);
	var dy = Math.abs(obj.y - this.y);
	
	if( (( dx < this.w) &&( dy < this.h))||
		(( dx < obj.w) &&( dy < obj.h)) ){
			this.onHit(obj);
			obj.onHit(this);
		  return true;
	  }
	return false;
}

Image.prototype.setSrc=function(src) {
	this.node.setAttribute("src",src);
	this.update();
}
Image.prototype.onHit=function() {}
Image.prototype.tick=function() {}
Image.prototype.systemTick=function() {this.tick();this.update();}


//====================
//ユーティリティ
//====================
//要素の取得
function getElement(name) {
    if(document.getElementById) return document.getElementById(name);
    if(document.all) return document.all(name);
    return null;
}

//RGB文字列の取得
function rgb2str(red,green,blue) {
    var color="#";
    if (red  <16) color+="0";
    color+=red.toString(16);
    if (green<16) color+="0";
    color+=green.toString(16);
    if (blue <16) color+="0";
    color+=blue.toString(16);
    return color;
}

//幅の取得
function getWidth() {
    if (self.innerWidth) {
        return self.innerWidth;
    } else if (document.body.clientWidth) {
        return document.body.clientWidth;
    }
    return 640;
}

//高さの取得
function getHeight() {
    if (self.innerHeight) {
        return self.innerHeight;
    } else if (document.body.clientHeight) {
        return document.body.clientHeight;
    }
    return 480;
}

//距離の2乗の計算
function calcLen(x0,y0,x1,y1) {
    return (x0-x1)*(x0-x1)+(y0-y1)*(y0-y1);
}
    
//乱数の取得
function rand(num) {
    return Math.floor(Math.random()*num);
}


var MIN_T = 33;

function tick(){
	var max = Sprites.length;
	for(var i=0;i<max;i++){
		Sprites[i].systemTick();
	}
	for(var j=0;j<max;j++){
		for(var i=0;i<max;i++)if(i!=j){
		if(Sprites[i].isHit(Sprites[j])){
				Sprites[i].onHit();
				Sprites[j].onHit();
			}
		}
	}
}

//メイン処理
function mainLoop(){
}

//システムのメイン処理
function systemMainLoop(){
	mainLoop();
	tick();
}

//ゲーム開始
function gameStart(){
	document.addEventListener("touchmove", onTouchmove, false);
	document.addEventListener("mousemove", onTouchmove, false);
	document.addEventListener("mousedown", onTouchdown, false);
	document.addEventListener("touchdown", onTouchdown, false);
	document.addEventListener("mouseup", onTouchup, false);
	document.addEventListener("touchup", onTouchup, false);
    setInterval(systemMainLoop, MIN_T);
}
var mouseX=0; //マウス/タッチ座標
var mouseY=0;
var button=false; //ボタン押下状態
function onTouchmove(event){
    mouseX = event.pageX;
	mouseY = event.pageY;
    event.preventDefault();
}
function onTouchdown(event){
	button = true;
    event.preventDefault();
}
function onTouchup(event){
	button = false;
    event.preventDefault();
}
