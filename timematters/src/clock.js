/*
* @Author: x
* @Date:   2017-11-15 15:30:25
* @Last Modified by:   x
* @Last Modified time: 2017-11-17 10:38:07
*/
var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var start = 0;
var end = 2 * Math.PI;
var rem = width / 200;

function drawBackGround() {
	ctx.save();
	//reset original point
	ctx.translate(r, r);
	//draw circle
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.arc(0, 0, r - 5 * rem, start, end);
	ctx.stroke();
	
	//write number
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 18 * rem + 'px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number, i) {
		var rad = (end - start) / 12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number, x, y);
	});

	//draw points
	for (var i = 0; i < 60; i++) {
		var rad = (end - start) / 60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		if (i % 5 == 0) {
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2 * rem, start, end);
		} else {
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2 * rem, start, end);
		}
		ctx.fill();
	}
}

function drawHour(hour, minute) {
	ctx.save();
	ctx.beginPath();
	var radHour = (end - start) / 12 * hour;
	var radMinute = (end - start) / 12/ 60 * minute;
	ctx.rotate(radHour + radMinute);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r / 2);
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var rad = (end - start) / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#b22222'
	var rad = (end - start) / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(1 * rem, -r + 18 * rem);
	ctx.lineTo(-1 * rem, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}

function drawOrigin() {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 2 * rem, start, end);
	ctx.fill();
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var seconde = now.getSeconds();
	drawBackGround();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(seconde);
	drawOrigin();
	ctx.restore();
}

draw();
setInterval(draw, 1000);