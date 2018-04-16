var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function length(x, y) {
    return Math.sqrt(x * x + y * y);
}

var TWO_PI = 2 * Math.PI;

//Durstenfeld shuffle
function shuffle(array) {
    for (var i = (array.length - 1); i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//http://http.developer.nvidia.com/Cg/clamp.html
function clamp(x, a, b) {
    return Math.max(a, Math.min(b, x));
}

//https://en.wikipedia.org/wiki/Smoothstep
function smoothstep(edge0, edge1, x) {
    // Clamp x to 0..1 range
    x = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    // Evaluate interpolation polynomial

    return x * x * x * (x * (x * 6 - 15) + 10);
    //cubic Hermite
    // return x*x*(3 - 2*x);
}


var fibers = [];
var fiberCount = 10;
var fiberResolution = 100;

//Difference between fibers
var offset = fiberResolution / 2;

var dy = 10;
var dx = 5;

for (i = 0; i < fiberCount; i++) {
    var fiber = {
        x: canvas.width / 5 + i * 10 * dx,
        y: canvas.height / 2 + i * dy,
        height: 10 + 10 * (fiberCount - i)
    };
    fibers.push(fiber);
}

var permutation = [];

//Create a random permutation of numbers from 0-255
//This is the number of possible values on the Y-axis
//These values are the values of the cell edges
var valCount = 256;
for (i = 0; i < valCount; i++) {
    permutation.push(i);
}
shuffle(permutation);

function interpolate(a0, a1, w) {
    return (1.0 - w) * a0 + w * a1;
}

var scale = 0.05;
var amplitude = (canvas.height / 2) / valCount;

//https://www.michaelbromley.co.uk/blog/90/simple-1d-noise-in-javascript
function noise1D(x) {
    //Scale coordinate
    var scaledX = x * scale;
    //Get lower cell edge coordinate
    var cellLow = Math.floor(scaledX);
    //Find where in the current cell value x lies
    var t = scaledX - cellLow;
    //Use an interpolated value at this position to make the result less jagged
    t = smoothstep(0, 1, t);

    //The cell values at the edges
    var xMin = cellLow % (valCount - 1);
    var xMax = (xMin + 1) % (valCount - 1);
    //Find the value at position t between edges xMin and xMax
    var y = interpolate(permutation[xMin], permutation[xMax], t);
    //Return the result scaled to the desired amplitude
    return y * amplitude;
}

var counter = 0;
var frame = 0;
function draw() {
    frame++;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    amplitude = (canvas.height / 2) / valCount;

    if (frame % 1 === 0) {
        frame = 0;
        counter++;
    }


    for (i = 0; i < fiberCount; i++) {

        //0, 170, 225
        ctx.strokeStyle = "#0af";

        ctx.fillStyle = "rgb(0," + ((170 - fiberCount * 15) + (i * 20)) + ",255)";
        ctx.beginPath();
        fibers[i].y = canvas.height / 2 + i * dy;
        fibers[i].x = (canvas.width / 2 - ((fibers.length - i) - fibers.length / 2) * 7 * dx) - fiberResolution * dx / 3;

        for (j = 0; j < fiberResolution; j++) {
            ratio = j / fiberResolution;
            ctx.lineTo(fibers[i].x + j * dx, ((fibers[i].y + fibers[i].height / 2) * (1 - ratio)) + (ratio) * (canvas.height / 4 + noise1D(offset * i + counter + (fiberResolution - j))));
        }
        for (j = (fiberResolution - 1); j >= 0; j--) {
            ratio = j / fiberResolution;
            ctx.lineTo(fibers[i].x + j * dx, ((fibers[i].y - fibers[i].height / 2) * (1 - ratio)) + (ratio) * (canvas.height / 4 + noise1D(offset * i + counter + (fiberResolution - j))));
        }
        ctx.lineTo(fibers[i].x, fibers[i].y + fibers[i].height / 2);
        ctx.stroke();
        ctx.fill();
    }
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);