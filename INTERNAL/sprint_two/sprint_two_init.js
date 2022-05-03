console.log("init js is called")

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
        console.log("Mouse down")
        // update positions (so this can be used in another object)
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
    }
    mUp(e){
        console.log("Mouse up")
        this.mouseIsDown = false;
    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(e){
        // this might be a useful safety feature
        this.mouseIsDown = false;
        console.log("Mouse has left the canvas")
    }
}

class Button extends InteractiveObject{
    constructor(x, y, w, h, fillC, hoverC, selectedC, text, textC){
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillC = fillC;
        this.hoverC = hoverC;
        this.selectedC = selectedC;
        this.text = text;
        this.textC = textC;
        this.inBounds = false;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y,this.w,this.h,this.xMouse,this.yMouse)
        let fillC = this.fillC;
        if (Button.selected === this){
            fillC = this.selectedC
        }
        else if (this.inBounds){
            fillC = this.hoverC
        }
        this.draw(this.x,this.y,this.w,this.h, fillC, this.text,
            this.textC)
    }
    mClick(){
        if (this.inBounds){
            Button.selected = this;
            console.log("Button clicked")
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    draw(x,y,w,h,fillC,text,textC){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = fillC;
        ctx.fill();
        let myFont = "bold 20 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textC;
        ctx.fillText(text, x + w/2, y + h/2)
    }
}
Button.selected = null;


class Grid{
    constructor(w,h,intervalW,strokeC,strokeW){
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
        // these loops also draw the grid outside as it is useful when analysing translations
        // and rotations (so you can ignore the negatives and use - instead
        // a loop for the vertical lines
        for(let i = -this.w; i <= this.w; i += this.intervalW) {
            this.basicLine(i, -this.h, i, this.h, this.strokeC, this.strokeW)
        }
        // a loop for the horizontals
        for(let j = -this.h; j <= this.h; j+= this.intervalW){
            this.basicLine(-this.w, j, this.w, j, this.strokeC, this.strokeW)
        }
    }
}
Grid.prototype.basicLine = basicLine

class Rectangle{
    constructor(x,y,h,w,fill){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill
    }
    update(){
        this.basicRect(this.x,this.y,this.w,this.h,this.fill)
    }
}
Rectangle.prototype.basicRect = basicRect

class Ellipse{
    constructor(x,y,radiusX,radiusY,rotation,startAngle,endAngle,fill){
        this.x = x
        this.y = y
        this.radiusX = radiusX
        this.radiusY = radiusY
        this.rotation = rotation
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.fill = fill
    }
    update(){
        this.basicEllipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation,this.startAngle,this.endAngle, this.fill)
    }
}
Ellipse.prototype.basicEllipse = basicEllipse

class Circle{
    constructor(x,y,r,startAngle,endAngle,fill){
        this.x = x
        this.y = y
        this.r = r
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.fill = fill
    }
    update(){
        this.basicCircle(this.x,this.y,this.r,this.startAngle,this.endAngle,this.fill)
    }
}
Circle.prototype.basicCircle = basicCircle

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

class Square{
    constructor(x,y,side,fillC){
        this.x = x
        this.y = y
        this.side = side
        this.fillC = fillC
    }
    update(){
        this.basicSquare(x,y,side,fillC)
    }
}
Square.prototype.basicSquare = basicSquare

function basicRect(x,y,w,h,fill){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = fill
    ctx.fill()
}

function tempRect(x,y,w,h){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.lineWidth = 4
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.stroke()
}

function tempLine(x_1,y_1,x_2,y_2){
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x_1,y_1)
    ctx.lineTo(x_2,y_2)
    ctx.stroke();
}

function basicLine(x_1,y_1,x_2,y_2,strokeC,strokeW){
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.beginPath();
    ctx.moveTo(x_1,y_1)
    ctx.lineTo(x_2,y_2)
    ctx.stroke();
}

function basicCircle(x,y,r,startAngle,endAngle,fillC){
    ctx.fillStyle = fillC;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.fill();

}

function tempCircle(x,y,r){
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x,y,r,0, 2*Math.PI);
    ctx.stroke();
}

function basicEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, fillC){
    ctx.fillStyle = fillC;
    ctx.beginPath();
    ctx.ellipse(x,y,radiusX,radiusY,rotation, startAngle,endAngle,fillC);
    ctx.fill();
}

function tempEllipse(x,y,radiusX,radiusY,rotation,startAngle,endAngle){
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = 2;
    ctx.ellipse(x,y,radiusX,radiusY,rotation, startAngle,endAngle);
    ctx.stroke();
}

function basicSquare(x,y,side,fillC){
    ctx.beginPath()
    ctx.rect(x,y,side,side)
    ctx.fillStyle = fillC
    ctx.fill()
}

function tempSquare(x,y,side){
    ctx.beginPath()
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = 2;
    ctx.rect(x,y,side,side)
    ctx.stroke()
}
