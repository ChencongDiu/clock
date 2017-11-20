/*
* @Author: x
* @Date:   2017-11-19 19:18:11
* @Last Modified by:   x
* @Last Modified time: 2017-11-19 21:33:55
*/
var WINDOW_WIDTH  = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP  = 60;
var MARGIN_LEFT = 30;
var START = 0;
var END   = 2 * Math.PI;

const endTime = new Date(2017, 10, 19, 23, 59);
var curShowTimeSeconds = 0;

window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds();
	setInterval(function() {
		render(ctx);
		update();
	}, 50);
};

function getCurShowTimeSeconds() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
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
		curShowTimeSeconds = nextShowTimeSeconds;
	}
};

function render(ctx) {
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

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
};

function renderDigit(x, y, num, ctx) {
	ctx.fillStyle = "rgb(0, 102, 153)";

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