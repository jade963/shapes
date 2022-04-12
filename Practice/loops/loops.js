console.log("function js is called")

// drawCircle x, y, r, fillC(rgb string), strokeC*rgb string,
// lineWidth, fill(boolean), stroke(boolean
function drawCircle(x, y, r, fillC, strokeC, lineW, fill, stroke){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    if(fill === true) {
        ctx.fillStyle = fillC;
        ctx.fill();
    }
    if(stroke === true) {
        ctx.lineWidth = lineW;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }
}
let i = 0;
drawCircle(100+70*i,200,30, colArray[1][5], colArray[2][9], 8,true, true);
i = 1
drawCircle(100+70*i,200,30, colArray[1][5], colArray[2][9], 8,true, true);
i = 2
drawCircle(100+70*i,200,30, colArray[1][5], colArray[2][9], 8,true, true);
i = 3
drawCircle(100+70*i,200,30, colArray[1][5], colArray[2][9], 8,true, true);
i = 4
drawCircle(100+70*i,200,30, colArray[1][5], colArray[2][9], 8,true, true);

// for loop - "i" will go up in increments of 1 until it reaches 9
// horizontal line
for(let i=0; i<10; i++){
    console.log(i)
    drawCircle(100+70*i,400,50, colArray[1][5], colArray[2][9], 8,true, true);

}

// vertical line
for(let j=0; j<10; j++){
    console.log(j)
    drawCircle(500,10+j*30,30, colArray[1][5], colArray[2][9], 8,true, true);

}


for(let i = 0; i<5; i++){
    for(let j = 0; j<5; j++){
        drawCircle(20+30*i,20+j*30, 10, colArray[1][5], colArray[2][9], 1,true, true);
    }
}