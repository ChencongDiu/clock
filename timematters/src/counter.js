/*
* @Author: x
* @Date:   2017-11-19 19:18:11
* @Last Modified by:   x
* @Last Modified time: 2017-11-22 18:38:17
*/
var WINDOW_WIDTH  = 720;
var WINDOW_HEIGHT = 360;
var RADIUS = 5;
var MARGIN_TOP  = 60;
var MARGIN_LEFT = 30;
var START = 0;
var END   = 2 * Math.PI;

const endTime = new Date();
var curShowTimeSeconds = 0;

var balls = [];
const colors = 
			["#33b5e5", "#0099cc", "#aa66cc",
			 "#9933cc", "#800080",
			 "#99cc00", "#669900", "#00ff99",
			 "#ffbb33", "#ff8800", "#ff4444", "#cc0000",
			 "#778899"]

window.onload = function() {
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds();
	setInterval(function() {
		if (!document.hidden) {
			render(ctx);
			update();
		}
	}, 50);
};

function write(ctx) {
	ctx.font = "bold 30px Comic Sans MS";
	ctx.fillStyle = "#236B9f";
	ctx.fillText("Counter - 1 hour", MARGIN_LEFT, MARGIN_TOP / 3);
};

function getCurShowTimeSeconds() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime() + 3600 * 1000;
	ret = Math.round(ret / 1000);

	return ret >= 0? ret: 0;
};

function update() {
	var nextShowTimeSeconds = getCurShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
	var nextSeconds = parseInt(nextShowTimeSeconds % 60);

	var curHours = parseInt(curShowTimeSeconds / 3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
	var curSeconds = parseInt(curShowTimeSeconds % 60);

	if (nextSeconds != curSeconds) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
		}
		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
		}
		if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
		}
		if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
		}
		if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
		}
		if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
};

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		/*if (balls[i].x >= (WINDOW_WIDTH - RADIUS)) {
			balls[i].x = (WINDOW_WIDTH - RADIUS);
			balls[i].vx = -balls[i].vx * 0.6;
		}*/
		if (balls[i].y >= (WINDOW_HEIGHT - RADIUS)) {
			balls[i].y = (WINDOW_HEIGHT - RADIUS);
			balls[i].vy = -balls[i].vy * 0.6;
		}

	}

	var cnt = 0;
	var minspeed = 1000;
	for (var i = 0; i < balls.length; i++) {
		//keep the ball
		if ((balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) && 
			!(balls[i].vy < 0.01 && balls[i].vx == 0) &&
			!(balls[i].y == (WINDOW_HEIGHT - RADIUS) && Math.abs(balls[i].vy) < 6)) {
			balls[cnt++] = balls[i];
		}
	}
	while (balls.length > cnt) {
		balls.pop();
	}
};

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			var xy = digitxy(x, y, i, j);
			var aBall = {
				x: xy[0],
				y: xy[1],
				g: 1.5 + Math.random(),
				vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * Math.floor(Math.random() * 4),
				vy: -Math.floor(Math.random() * 10),
				color: colors[Math.floor(Math.random() * colors.length)]
			};
			balls.push(aBall);
		}
	}
}

function render(ctx) {
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //matters!

	ctx.fillStyle = "#f0f0f0";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	write(ctx);

	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
	var seconds = parseInt(curShowTimeSeconds % 60);

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle = balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, RADIUS, START, END);
		ctx.closePath();
		ctx.fill();
	}
};

function renderDigit(x, y, num, ctx) {
	//ctx.fillStyle = "rgb(0, 102, 153)";
	ctx.fillStyle = "#236B9f";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var xy = digitxy(x, y, i, j);
				ctx.beginPath();
				ctx.arc(xy[0], xy[1], RADIUS, START, END);
				ctx.closePath();

				ctx.fill();
			}
		}
	}
};

function digitxy(x, y, i, j) {
	var digitx = x + j * 2 * (RADIUS + 1) + (RADIUS + 1);
	var digity = y + i * 2 * (RADIUS + 1) + (RADIUS + 1);
	return [digitx, digity];
};