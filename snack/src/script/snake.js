/*
* @Author: x
* @Date:   2017-11-15 18:58:42
* @Last Modified by:   x
* @Last Modified time: 2017-11-15 22:17:30
*/
var jsBody = document.getElementById("world");
var jsSnack = document.getElementById("snack");
var jsFood = document.getElementById("food");
var jsScore = document.getElementById("score");
var timer;
var speed = 300;
var checkEat = setInterval(eat,speed); //check eating
var srr = []; //tracker
var num = 0; //length of arr

function eat(){
    checkEating(jsSnack,jsFood);
    function checkEating(snake, food) {
    	//distance from object's left to world left
        var snakeL = snake.offsetLeft;
        var snakeT = snake.offsetTop;
        var foodL = food.offsetLeft;
        var foodT = food.offsetTop;
        
        //check eating, snake and food are overlapping
        if (snakeL == foodL && snakeT == foodT) {
        	//create a body
            newBody = document.createElement("div");
            newBody.setAttribute("class","body");
            jsBody.appendChild(newBody);
            Pos();
            speed *= 0.95
            setInterval(follow,speed);
        }
    }

    function follow(){
        var bodyNum = document.getElementsByClassName("body");
        jsScore.innerHTML = bodyNum.length;
        var place = 0 ;
        for(var i = 0 ; i<bodyNum.length ; i++){
            place += 1;
            bodyNum[i].style.left=srr[num-place][0] + 'px';
            bodyNum[i].style.top=srr[num-place][1] + 'px';    
        }
    }
}

document.onkeydown = function(e) {
	var evt = e || window.event;
	switch(evt.keyCode) {
		//left 37
		case 37:
			clearInterval(timer);
            timer = window.setInterval(runLeft,speed)
            function runLeft(){
                if (jsSnack.offsetLeft >= 24) {
                    jsSnack.style.left = jsSnack.offsetLeft - 24 + "px";
                    jsSnack.style.top = jsSnack.offsetTop + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }
        break;
		//up 38
		case 38:
			clearInterval(timer);
            timer=window.setInterval(runTop,speed)
            function runTop(){
                if (jsSnack.offsetLeft >= 24) {
                    jsSnack.style.top = jsSnack.offsetTop - 24 + "px";
                    jsSnack.style.left = jsSnack.offsetLeft + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }
        break;
		//right 39
		case 39:
			clearInterval(timer);
            timer=window.setInterval(runRight,speed);
            function runRight(){
                if (jsSnack.offsetLeft + jsSnack.offsetWidth <= 456) {
                    jsSnack.style.left = jsSnack.offsetLeft + 24 + "px";
                    jsSnack.style.top = jsSnack.offsetTop + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }                    
        break;
		//down 40
		case 40:
			clearInterval(timer);
            timer=window.setInterval(runBottom,speed);            
            function runBottom(){
                if (jsSnack.offsetTop + jsSnack.offsetHeight <= 456) {
                    jsSnack.style.top = jsSnack.offsetTop + 24 + "px";
                    jsSnack.style.left = jsSnack.offsetLeft + "px";
                    srr.push([jsSnack.offsetLeft, jsSnack.offsetTop]);
                    num++;
                }                        
            }                    
        break;
	}
}

//generate food randomly
function Pos(){
	//random int [0, 19]
	var ranL = parseInt(Math.random() * 20);
	var ranT = parseInt(Math.random() * 20);
    jsFood.style.left = ranL * 24 + "px";
    jsFood.style.top = ranT * 24 + "px";
}
Pos();