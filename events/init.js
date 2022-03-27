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
my_c.style.backgroundColor = "rgb(0,153,204)";
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(0,255,0,1)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(204,0,0)";

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
    drawLine(x_1, y_1, x_2, y_2, strokeC, strokeW){
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2, y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeC;
        ctx.lineWidth = strokeW;
        ctx.stroke();
    }
}

function drawRectangle(x,y,w,h,fillC){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = fillC;
    ctx.fill();
}

let colArray=[

    [ "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)",
        "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
        "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)"
    ],

    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)",
        "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",
        "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)"
    ],

    [ "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)",
        "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",
        "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)"
    ]
]