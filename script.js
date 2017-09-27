
// the primitive twig lines
let spacing = 60;

let backSlash = 	{ a: { x: 0, 	     y: 0         }, 
					  b: { x: spacing,   y: spacing   }};
					  
let vertical = 	    { a: { x: spacing/2, y: 0         }, 
					  b: { x: spacing/2, y: spacing   }};
						
let forwardSlash = 	{ a: { x: spacing,   y: 0         }, 
					  b: { x: 0,         y: spacing   }};	
					  
let horizontal = 	{ a: { x: 0,   		 y: spacing/2 }, 
					  b: { x: spacing,   y: spacing/2 }};



let xOffset = 0;
let yOffset = 0;
let direction = 1;

let twigs = [backSlash, vertical, forwardSlash, horizontal];
let twigsIndex = 0;

let twigColors = ["#3A0800", "#60360B", "#3A1D00"];
let twigColIndex = 0;

let FPS = 15; // frames per second



// let the laying of twigs begin
window.onload = function() {
	setup();
};


function setup() {
	getCanvas();
	
	// background
	context.fillStyle = "#317E48"; 
	context.fillRect(0, 0, width, height);
	grassyBackground();

	// style of twigs
	context.strokeStyle = twigColors[twigColIndex];
	context.lineWidth = 8;
	context.lineCap = "round";
}


function draw() {
	
	// if yOffset is equal to height then we can stop laying twigs
	if (yOffset >= height) {
		clearInterval(drawLoop);
		return;
	}
	
	// select and draw a twig
	let twig = twigs[twigsIndex];
	drawTwig(twig.a, twig.b);
	
	// increment twig orientation (maybe)
	if (Math.random() < 0.9) incrementTwigOrientation();
	
	// increment twig color (possibly)
	if (Math.random() < 0.2) incrementTwigColor();
	
	// increment offsets (perhaps)
	if (Math.random() < 0.7) incrementOffsets();


	
}



function drawTwig(a, b) {
	/* Draw a twig from point a to b. */
	context.beginPath();
	context.moveTo(a.x + xOffset, a.y + yOffset);
	context.lineTo(b.x + xOffset, b.y + yOffset);
	context.stroke();
	context.closePath();
}


function getCanvas() {
	/* Get the canvas element from document and assign
	 * canvas, context, width and height as window variables.
	 * */
	window.canvas = document.getElementById("canvas");
	window.context = canvas.getContext("2d");
	window.width = canvas.width;
	window.height = canvas.height;	
}


function grassyBackground() {
	/* create a grassy background using a texture found at:
	 * https://hhh316.deviantart.com/art/Dark-Green-grass-ground-land-dirt-aerial-top-seaml-445047560
	 */ 
	let img = new Image();
	img.src = "grass.jpg";
	img.onload = function() { 
		context.fillStyle = context.createPattern(img, 'repeat');
		context.fillRect(0, 0, width, height);
        window.drawLoop = setInterval(draw, 1000/FPS);
	};
}


function incrementOffsets() {
	switch (direction) {
		case 1:
			xOffset += spacing;
			break;
		case -1:
			xOffset -= spacing;
			break;
	}
	
	// change direction if we've gone off the grass
	if (xOffset >= width || xOffset < 0) {
		direction *= -1;
		yOffset += spacing;
	}
}


function incrementTwigColor() {
	twigColIndex++;
	if (twigColIndex >= twigColors.length) twigColIndex = 0;
	context.strokeStyle = twigColors[twigColIndex];	
	
}


function incrementTwigOrientation() {
	twigsIndex += direction;
	if (twigsIndex >= twigs.length) twigsIndex = 0;
	if (twigsIndex < 0) twigsIndex = twigs.length-1;
}
