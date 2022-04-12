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
    mClick(){}
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
        console.log("moving");
    }
    mLeave(e){
        // this might be a useful safety feature
        this.mouseIsDown = false;
        console.log("Mouse has left the canvas")
    }
}

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
            this.drawLine(i, -this.h, i, this.h, this.strokeC, this.strokeW)
        }
        // a loop for the horizontals
        for(let j = -this.h; j <= this.h; j+= this.intervalW){
            this.drawLine(-this.w, j, this.w, j, this.strokeC, this.strokeW)
        }
    }
}

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

function basicRect(x,y,w,h,fill){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = fill
    ctx.fill()
}

function strokeRect(x,y,w,h,colour,l){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.lineWidth = l
    ctx.strokeStyle = colour;
    ctx.stroke()
}
Grid.prototype.drawLine = drawLine
function drawLine(x_1,y_1,x_2,y_2,strokeC,strokeW){
    ctx.strokeStyle = strokeC
    ctx.lineWidth = strokeW;
    ctx.beginPath();
    ctx.moveTo(x_1,y_1)
    ctx.lineTo(x_2,y_2)
    ctx.stroke();
}

function drawStrokeCircle(x,y,r,strokeC,strokeW){
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.beginPath();
    ctx.arc(x,y,r,0, 2*Math.PI);
    ctx.stroke();
}