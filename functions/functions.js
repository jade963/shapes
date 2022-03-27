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

drawCircle(100,200,50, colArray[5], colArray[7], 8,true, true);
drawCircle(300,200,100, colArray[5], colArray[7], 8,false, true);
