/*
* @Author: x
* @Date:   2017-11-15 18:58:42
* @Last Modified by:   x
* @Last Modified time: 2017-11-15 22:52:19
*/
var world = document.getElementById("world");
var snack = document.getElementById("snack");
var food = document.getElementById("food");
var score = document.getElementById("score");
var timer;
var speed = 300;
var checkEat = setInterval(eat,speed); //check eating
var track = []; //tracker
var num = 0; //length of arr
var preDir = 0;

function eat(){
    checkEating(snack,food);
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
            world.appendChild(newBody);
            generate();
            speed *= 0.95
            setInterval(follow,speed);
        }
    }

    function follow(){
        var bodyNum = document.getElementsByClassName("body");
        score.innerHTML = bodyNum.length;
        var place = 0;
        for(var i = 0 ; i < bodyNum.length ; i++){
            place += 1;
            bodyNum[i].style.left = track[num - place][0] + 'px';
            bodyNum[i].style.top = track[num - place][1] + 'px';    

        }
    }
}

document.onkeydown = function(e) {
	var evt = e || window.event;
	switch(evt.keyCode) {
		//left 37
		case 37:
			//check turnback
			if (preDir == 39) {
				break;
			}
			clearInterval(timer);
            timer = window.setInterval(runLeft,speed)
            function runLeft(){
                if (snack.offsetLeft >= 24) {
                    snack.style.left = snack.offsetLeft - 24 + "px";
                    snack.style.top = snack.offsetTop + "px";
                    track.push([snack.offsetLeft, snack.offsetTop]);
                    preDir = 37;
                    num++;
                }           
            }
        break;
		//up 38
		case 38:
			//check turnback
			if (preDir == 40) {
				break;
			}
			clearInterval(timer);
            timer=window.setInterval(runTop,speed)
            function runTop(){
                if (snack.offsetLeft >= 24) {
                    snack.style.top = snack.offsetTop - 24 + "px";
                    snack.style.left = snack.offsetLeft + "px";
                    track.push([snack.offsetLeft, snack.offsetTop]);
                    preDir = 38;
                    num++;
                }                      
            }
        break;
		//right 39
		case 39:
			//check turnback
			if (preDir == 37) {
				break;
			}
			clearInterval(timer);
            timer=window.setInterval(runRight,speed);
            function runRight(){
                if (snack.offsetLeft + snack.offsetWidth <= 456) {
                    snack.style.left = snack.offsetLeft + 24 + "px";
                    snack.style.top = snack.offsetTop + "px";
                    track.push([snack.offsetLeft, snack.offsetTop]);
                    preDir = 39;
                    num++;
                }                        
            }                    
        break;
		//down 40
		case 40:
			//check turnback
			if (preDir == 38) {
				break;
			}
			clearInterval(timer);
            timer=window.setInterval(runBottom,speed);            
            function runBottom(){
                if (snack.offsetTop + snack.offsetHeight <= 456) {
                    snack.style.top = snack.offsetTop + 24 + "px";
                    snack.style.left = snack.offsetLeft + "px";
                    track.push([snack.offsetLeft, snack.offsetTop]);
                    preDir = 40;
                    num++;
                }                        
            }                    
        break;
	}
}

//generate a food in an valid position
function generate() {
	var bodyNum = document.getElementsByClassName("body");
	var ranL = parseInt(Math.random() * 20) * 24;
	var ranT = parseInt(Math.random() * 20) * 24;
    for(var i = 0 ; i < bodyNum.length ; i++){
        var bodyL = bodyNum[i].style.left
        var bodyR = bodyNum[i].style.top
        if (ranL == bodyL && ranR == bodyR) {
        	ranL = parseInt(Math.random() * 20) * 24;
        	ranT = parseInt(Math.random() * 20) * 24;
        	i = 0;
        }   
    }
    food.style.left = ranL + "px";
    food.style.top = ranT + "px";
}
generate();