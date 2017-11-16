/*
* @Author: x
* @Date:   2017-11-15 18:58:42
* @Last Modified by:   x
* @Last Modified time: 2017-11-15 19:18:51
*/
var jsDiv = document.getElementById("window");
var jsSnack = document.getElementById("snack");
var jsStart = document.getElementById("start");
var jsFood = document.getElementById("food");
var jsBody = document.getElementById("world");
var jsScore = document.getElementById("score");
var timer;
var timer1 = setInterval(eat,10); //check collision and eat
var srr = []; //tracker
var num = 0; //length of arr
var jsSnackBody; //length of snake

document.onkeydown = function(e) {
	var evt = e || window.event;
	switch(evt.keyCode) {
		//left 37
		case 37:
			clearInterval(timer);
            timer=window.setInterval(runLeft,10)
            function runLeft(){
                if (jsSnack.offsetLeft > 0) {
                    jsSnack.style.left = jsSnack.offsetLeft - 1 + "px";
                    jsSnack.style.top = jsSnack.offsetTop + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }
        break;
		//up 38
		case 38:
			clearInterval(timer);
            timer=window.setInterval(runTop,10)
            function runTop(){
                if (jsSnack.offsetLeft > 0) {
                    jsSnack.style.top = jsSnack.offsetTop - 1 + "px";
                    jsSnack.style.left = jsSnack.offsetLeft + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }
        break;
		//right 39
		case 39:
			clearInterval(timer);
            timer=window.setInterval(runRight,10);
            function runRight(){
                if (jsSnack.offsetLeft + jsSnack.offsetWidth <= 450) {
                    jsSnack.style.left = jsSnack.offsetLeft + 1 + "px";
                    jsSnack.style.top = jsSnack.offsetTop + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }                    
        break;
		//down 40
		case 40:
			clearInterval(timer);
            timer=window.setInterval(runBottom,10);            
            function runBottom(){
                if (jsSnack.offsetTop + jsSnack.offsetHeight <= 400) {
                    jsSnack.style.top = jsSnack.offsetTop + 1 + "px";
                    jsSnack.style.left = jsSnack.offsetLeft + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }                    
        break;
	}
}

function Pos(){
    jsFood.style.left=parseInt(Math.random() * (430 - 20 + 1) + 20) + "px";
    jsFood.style.top=parseInt(Math.random() * (380 - 20 + 1) + 20) + "px";
}
Pos();

function eat(){
    rectangleCrashExamine(jsSnack,jsFood);
    function rectangleCrashExamine(obj1, obj2) {
        var obj1Left = obj1.offsetLeft;
        var obj1Width = obj1.offsetLeft + obj1.offsetWidth;
        var obj1Top = obj1.offsetTop;
        var obj1Height = obj1.offsetTop + obj1.offsetHeight;
        var obj2Left = obj2.offsetLeft;
        var obj2Width = obj2.offsetLeft + obj2.offsetWidth;
        var obj2Top = obj2.offsetTop;
        var obj2Height = obj2.offsetTop + obj2.offsetHeight;
        
        if ( !(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top) ) {
            jsSnackBody = document.createElement("div");
            jsSnackBody.setAttribute("class","body");
            jsBody.appendChild(jsSnackBody);
            setInterval(follow,10);
        }
    }

    function follow(){
        var bodyNum = document.getElementsByClassName("body");
        jsScore.innerHTML = bodyNum.length;
        var place = 0 ;
        for( var i = 0 ; i<bodyNum.length ; i++){
            place += 20;
            bodyNum[i].style.left=srr[num-place][0] + 'px';
            bodyNum[i].style.top=srr[num-place][1] + 'px';    
        }
    }
}