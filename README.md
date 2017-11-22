# Canvas
## api
### draw - rectangle
	ctx.rect(x, y, width, height);
	ctx.fillRect(x, y, width, height);
	ctx.strokeRect(x, y, width, height);
### draw - arc I
	ctx.arc(center_x, center_y, radius, startingAngle, endingAngle, anticlockwise = false);
	ctx.arcTo(x1, y1, x2, y2, radius); //(x0, y0) is previous ending point
### [draw - arc II](tinyurl.com/html5quadratic)
	ctx.moveTo(x0, y0);
	ctx.quadraticCurveTo(x1, y1, x2, y2);
### [draw - arc III](tinyurl.com/html5quadratic)
	ctx.moveTo(x0, y0);
	ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
### text - fill(can be used with fillStyle)
	ctx.font = "bold 40px Arial"; //see more below
	ctx.fillText(String, x, y, (maxlen));
### text - font
	ctx.font = font-style, font-variant, font-weight, font-size, font-family;
	font-style: normal, italic, oblique
	font-variant: normal, small-caps
	font-weight: normal(100, 200, 300, 400), lighter, bold(500, 600, 700), bolder(800, 900)
	font-size: 20px, 2em, 150%, xx-small, x-small, medium, large, x-large, xx-large
### text - stroke
	ctx.font = "bold 40px Arial";
	ctx.strokeText(String, x, y, (maxlen));
### text - textAlign(horizontal)
	ctx.textAlign = left, center, right;
### text - textBaseLine(vertical)
	ctx.textBaseLine = alphabetic, top, middle, bottom, ideographic, hanging;
### text - measure
	ctx.measureText(string).width;
### fillStyle, strokeStyle = "color in string"
	#ffffff;
	#642; //#664422
	rgb(255, 128, 0);
	rgba(100, 100, 100, 0.8); //used to draw semi-transparent
	hsl(20, 62%, 28%);
	hsla(40, 82%, 33%, 0.6); //used to draw semi-transparent
	red;
### fillStyle - gradient I
	var grd = ctx.createLinearGradient(xstart, ystart, xend, yend);
	grd.addColorStop(stop, color); //stop = [0.0, 1.0]
	ctx.fillStyle = grd;
### fillStyle - gradient II
	var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
	grd.addColorStop(stop, color); //stop = [0.0, 1.0]
	ctx.fillStyle = grd;
### fillStyle - createPattern
	var pattern = ctx.createPattern(img, repeat-style);
	ctx.fillStyle = pattern;
	img: image, canvas, video
	reapeat-style: no-repeat, repeat-x, repeat-y, repeat
### style of line
	ctx.lineWidth;
	ctx.lineCap = "butt"/"round"/"square"; //only effect begin and close
	ctx.lineJoin = "miter"/"bevel"/"round"; //only effect begin and close
	ctx.miterLimit; //to control max-length of miter
### object transform I(coordinate transform actually)
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(deg);
	ctx.scale(sx, sy); //also scale coordinate, lineWidth...
	ctx.restore();
### object transform II(using transformation matrix)
	//a  c  e
	//b  d  f
	//0  0  1
	//a: horizontal scale, b: horizontal rotate
	//c: vertical scale, d: vertical rotate
	//e: horizontal translate, f: vertical translate
	ctx.transform(a, b, c, d, e, f);
	ctx.setTransform(a, b, c, d, e, f); //reset
### shadow
*****
## **tips(order matters!)**
### to get a perfect closed shape
	ctx.beginPath(); ...; ctx.closePath();
### start another draw
	ctx.beginPath(); ctx.lineTo(); -> ctx.beginPath(); ctx.moveTo();
