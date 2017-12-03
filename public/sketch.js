var socket;
var r;
var g;
var b;
var slider;
var sizecounter;

function setup() {
  ////////////
    socket = io.connect();

    socket.on("syncDrawing", newDrawing);
    socket.on("currentState", initializeBoard);


    r = random(100, 255); // random color for newly created user
    g = random(100, 255);
    b = random(100, 255);

    slider = createSlider(1,8, 5);    // createSlider(minVal, maxVal, startVal)
    slider.parent('slider');
    sizecounter = select(".sizecounter");
    sizecounter.html(slider.value());
    var canvas = createCanvas(750,500);
    canvas.class('canvas');
    canvas.parent('canvas-holder');
    background(51);

    strokeWeight(5);
}

// initializes the canvas1
function initializeBoard(data) {
    for (var i = 0; i < data.length; i ++) {
        stroke(data[i].red, data[i].green, data[i].blue);
        line(data[i].x, data[i].y, data[i].px, data[i].py);
    }
}

// syncs drawing with other users
function newDrawing(data){
    strokeWeight(data.weight);
    stroke(data.red,data.green,data.blue);
    line(data.x, data.y, data.px, data.py);
}

function mouseDragged() {
    sizecounter = select(".sizecounter");
    sizecounter.html(slider.value());
    strokeWeight(slider.value());

    stroke(r,g,b);
    line(mouseX, mouseY, pmouseX, pmouseY);

    var data = {
        "red": r,
        "green": g,
        "blue": b,
        "x": mouseX,
        "y": mouseY,
        "px": pmouseX,
        "py": pmouseY,
        "weight": slider.value()
    };

    socket.emit('mouseEvent', data);
}

function draw() {
}
