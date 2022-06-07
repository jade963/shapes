canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
// define width and height
let width = 1000;
let height = 600;
let scale = 2;
canvas.width = width*scale;
canvas.height = height*scale;
ctx.scale(scale,scale);
let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(255,255,255)";
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgb(0,0,0)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(255,255,255)";


let colArray=[

    ["rgba(90,50,0,1)", "rgba(255,150,200,1)", "rgba(255,0,0,1)","rgba(255,128,0,1)","rgba(255,255,0,1)",
        "rgba(125,258,0,1)","rgba(0,255,128,1)","rgba(0,255,255,1)", "rgba(150,150,255,1)","rgba(0,0,255,1)",
        "rgba(75,0,150,1)","rgba(255,0,255,1)","rgba(0,0,0,1)","rgba(160,160,160,1)","rgba(255,255,255,1)"]
    /*[
    "rgba(90,50,0,0.5)","rgba(255,150,200,0.5)","rgba(255,0,0,0.5)","rgba(255,128,0,0.5)","rgba(255,255,0,0.5)",
        "rgba(125,258,0,0.5)","rgba(0,255,128,0.5)","rgba(0,255,255,0.5)","rgba(150,150,255,0.5)","rgba(0,0,255,0.5)",
        "rgba(75,0,150,0.5)","rgba(255,0,255,0.5)","rgba(0,0,0,0.5)","rgba(160,160,160,0.5)","rgba(255,255,255,0.5)"
    ]*/
]


// function for reading user interactions with the canvas (e.g. click)
class InteractiveObject{
    constructor(){
        // this listens for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        // variables to hold where the mouse was first clicked down
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mClick(){
    }
    mDown(e){
        // update positions (so this can be used in another object)
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
    }
    mUp(e){
        // the mouse is no longer down
        this.mouseIsDown = false;
    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(){
        // this might be a useful safety feature
        this.mouseIsDown = true;
        console.log("Mouse has left the canvas")
    }
}


// class for creating an interactive button object
/**
 * this.x = x-value of button
 * this.y = y-value of button
 * this.w = width of button
 * this.h = height of button
 * this.lineW =  width of stroke around button
 * this.hoverLine = width of stroke around button when being hovered over
 * this.fillC = fill colour of button
 * this.strokeC = stroke colour of button
 * this.hoverC = stroke colour of button when being hovered over
 * this.selectedC = stroke colour of button when selected
 * this.text = text on button
 * this.textC = colour of text
 */
class Button extends InteractiveObject{
    constructor(x, y, w, h, lineW, hoverLine, fillC,strokeC, hoverC,selectedC,text, textC, xStart,yStart){
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lineW = lineW;
        this.hoverLine = hoverLine;
        this.fillC = fillC;
        this.strokeC = strokeC;
        this.hoverC = hoverC;
        this.selectedC = selectedC;
        this.text = text;
        this.textC = textC;
        this.inBounds = false;
        this.name = Button;
        this.xStart = xStart;
        this.yStart = yStart;
        this.amIDrawing = false;
    }
    update(){
        // checks if the mouse is over the button
        this.inBounds = this.getBoundary(this.x,this.y,this.w,this.h,this.xMouse,this.yMouse)
        this.amIDrawing = this.getBoundary(275,0,1000-275,600,this.xStart,this.yStart)
        let strokeC = this.strokeC
        let lineW = this.lineW
        // changes appearance of button if the button is selected or not/being hovered over or not
        if (this.name.selected === this){
            lineW = this.hoverLine
            strokeC = this.selectedC
        }
        else if (this.inBounds){
            lineW = this.hoverLine
            strokeC = this.hoverC
        }
        else if (this.inBounds === false){
            lineW = this.lineW
            strokeC = "rgba(0,0,0,0)"
        }
        // draws the button
        this.draw(this.x,this.y,this.w,this.h,lineW,this.fillC,strokeC,this.hoverC,this.selectedC,
            this.text,this.textC)
    }
    mClick(){
        // if the mouse clicks while within the button's boundaries, Button is selected.
        if (this.inBounds && this.amIDrawing === false){
            this.name.selected = this;
        }
    }
    // finds out if the mouse is within the button's boundaries - returns true or false
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    // draws the button
    draw(x,y,w,h,lineW,fillC,strokeC,hoverC,selectedC,text,textC){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillC;
        ctx.fill();
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = lineW;
        ctx.stroke();
        let myFont = "bold 20 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textC;
        ctx.fillText(text, x + w/2, y + h/2)
    }
}
// makes sure an individual button is not selected immediately (necessary as there are multiple buttons)
Button.selected = null;


// class for colour swatches - similar to Button
class Swatch extends Button{
    constructor(x, y, w, h, lineW, hoverLine, fillC, hoverC, selectedC, strokeC, amIDrawing){
        super(x, y, w, h, lineW, hoverLine, fillC, hoverC, selectedC, strokeC,amIDrawing);
        this.name = Swatch;
        this.inBounds = false;
        this.amIDrawing = false;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y,this.w,this.h,this.xMouse,this.yMouse)
        this.amIDrawing = this.getBoundary(275,0,1000-275,600,this.xStart,this.yStart)
        let strokeC = this.strokeC
        let lineW = this.lineW
        if (this.name.selected === this){
            lineW = this.hoverLine
            strokeC = this.selectedC
        }
        else if (this.inBounds){
            lineW = this.hoverLine
            strokeC = this.hoverC
        }
        else if (this.inBounds === false){
            lineW = this.lineW
            strokeC = this.strokeC
        }
        this.draw(this.x,this.y,this.w,this.h,lineW,this.fillC,strokeC)
    }
    draw(x,y,w,h,lineW,fillC,strokeC){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillC;
        ctx.fill();
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = lineW;
        ctx.stroke();
    }
}
Swatch.selected = null;


class Toggler extends Button{
    constructor(x, y, w, h, lineW, hoverLine,fillC,strokeC,hoverC,selectedC,fullText,type,status,amIDrawing){
        super(x, y, w, h, lineW, hoverLine,fillC,strokeC,hoverC,selectedC,amIDrawing);
        this.fullText = fullText;
        this.type = type;
        this.status = status;
        this.selected = true;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y,this.w,this.h,this.xMouse,this.yMouse)
        this.amIDrawing = this.getBoundary(275,0,1000-275,600,this.xStart,this.yStart)
        let lineW = this.lineW
        let strokeC = this.strokeC
        let status = this.status
        if (this.selected === true){
            strokeC = this.selectedC
            lineW = this.hoverLine
            status = "on"
        }
        else if (this.inBounds){
            strokeC = this.hoverC
            lineW = this.hoverLine
            status = "off"
        }
        else if (this.inBounds === false){
            strokeC = this.strokeC
            lineW = this.lineW
            status = "off"
        }
        this.fullText = `${this.type} ${status}`
        this.draw(this.x,this.y,this.w,this.h,lineW,this.hoverLine,this.fillC,strokeC,this.hoverC,this.selectedC,
            this.fullText,this.type,status)
    }
    mClick(){
        if (this.inBounds && this.amIDrawing === false){
            this.selected = !this.selected;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    draw(x,y,w,h,lineW,hoverLine,fillC,strokeC,hoverC,selectedC,fullText){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillC;
        ctx.fill();
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = lineW;
        ctx.stroke();
        let myFont = "bold 20 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText(fullText, x + w/2, y + h/2)
    }
}


class Colour_Button extends Button{
    constructor(x, y, w, h, lineW, hoverLine, fillC, strokeC, hoverC, selectedC,text, textC, xStart, yStart, inBounds, amIDrawing){
        super(x, y, w, h, lineW, hoverLine, fillC, strokeC, hoverC,selectedC,text, textC, xStart, yStart, inBounds, amIDrawing)
        this.name = Colour_Button
    }
}
Colour_Button.selected = null;


// draws a grid on canvas background
class Grid{
    constructor(x,y,w,h,intervalW,strokeC,strokeW){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.intervalW = intervalW;
        this.strokeC = strokeC;
        this.strokeW = strokeW;
    }
    update(){
        this.draw()
    }
    draw(){
        // a loop for the vertical lines
        for(let i = this.x; i <= this.w; i += this.intervalW) {
            this.basicLine(i,this.y,i,i+this.h,this.strokeC,this.strokeW)
        }
        // a loop for the horizontals
        for(let j = this.y; j <= this.h; j+= this.intervalW){
            this.basicLine(this.x,j,this.x+this.w,j,this.strokeC,this.strokeW)
        }
    }
}
Grid.prototype.basicLine = basicLine


// class for creating rectangle objects
class Rectangle{
    constructor(x,y,h,w,fill,stroke,fillC,strokeC,lineWidth){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill
        this.stroke = stroke
        this.fillC = fillC
        this.strokeC = strokeC
        this.lineWidth = lineWidth
    }
    update(){
        this.basicRect(this.x,this.y,this.w,this.h,this.fill,this.stroke,this.fillC,this.strokeC, this.lineWidth)
    }
}
Rectangle.prototype.basicRect = basicRect


// class for creating ellipse objects
class Ellipse{
    constructor(x,y,radiusX,radiusY,rotation,startAngle,endAngle,fill,stroke,fillC,strokeC,lineWidth){
        this.x = x
        this.y = y
        this.radiusX = radiusX
        this.radiusY = radiusY
        this.rotation = rotation
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.fill = fill
        this.stroke = stroke
        this.fillC = fillC
        this.strokeC = strokeC
        this.lineWidth = lineWidth
    }
    update(){
        this.basicEllipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation,this.startAngle,this.endAngle,
            this.fill,this.stroke,this.fillC,this.strokeC,this.lineWidth)
    }
}
Ellipse.prototype.basicEllipse = basicEllipse


// class for creating line objects
class Line{
    constructor(x1,y1,x2,y2,strokeC,strokeW){
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.strokeC = strokeC
        this.strokeW = strokeW
    }
    update(){
        this.basicLine(this.x1,this.y1,this.x2,this.y2,this.strokeC,this.strokeW)
    }
}
Line.prototype.basicLine = basicLine


// function for drawing a rectangle
function basicRect(x,y,w,h,fill,stroke,fillC,strokeC,lineWidth){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    if (stroke === true){
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeC
        ctx.stroke()
    }
    if (fill === true){
        ctx.fillStyle = fillC
        ctx.fill()
    }
}


// function for drawing the "guide" rectangle
function tempRect(x,y,w,h){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.lineWidth = 4
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.stroke()
}


// function for drawing the "guide" line
function tempLine(x_1,y_1,x_2,y_2){
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x_1,y_1)
    ctx.lineTo(x_2,y_2)
    ctx.stroke();
}


// function for drawing a line
function basicLine(x_1,y_1,x_2,y_2,strokeC,strokeW){
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.beginPath();
    ctx.moveTo(x_1,y_1)
    ctx.lineTo(x_2,y_2)
    ctx.stroke();
}


// function for drawing a "guide" circle
function tempCircle(x,y,r){
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x,y,r,0, 2*Math.PI);
    ctx.stroke();
}


// function for drawing an ellipse
function basicEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, fill, stroke, fillC, strokeC, lineWidth){
    ctx.fillStyle = fillC;
    ctx.beginPath();
    ctx.ellipse(x,y,radiusX,radiusY,rotation, startAngle,endAngle);
    if (stroke === true){
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeC
        ctx.stroke()
    }
    if (fill === true){
        ctx.fillStyle = fillC
        ctx.fill()
    }
}


// function for drawing the "guide" ellipse
function tempEllipse(x,y,radiusX,radiusY,rotation,startAngle,endAngle){
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = 2;
    ctx.ellipse(x,y,radiusX,radiusY,rotation, startAngle,endAngle);
    ctx.stroke();
}