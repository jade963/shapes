function drawRect(x, y, w, h, lw, fillC, strokeC, fill, stroke){
    ctx.beginPath();
    ctx.rect(x, y, w, h)
    if(stroke === true){
        ctx.lineWidth = lw;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }
    if(fill === true){
        ctx.fillStyle = fillC;
        ctx.fill();
    }
}

function drawCircle(x, y, r, lw, fillC, strokeC, fill, stroke){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    if(stroke === true){
        ctx.lineWidth = lw;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }
    if(fill === true){
        ctx.fillStyle = fillC;
        ctx.fill();
    }
}

/*ctx.save();
ctx.translate(100,100)
ctx.rotate(30*Math.PI/180)
drawCircle(0,0,20,"", colArray[2][8], 2, true, false)
drawRect(0,0,50,50,1, colArray[2][8],colArray[2][3],true, true)
ctx.restore();*/

ctx.save();
ctx.translate(300,300)
for(let i=0; i<360; i+=15){
    ctx.rotate(15*Math.PI/180)
    drawRect(0,0,100,100,2, "", colArray[0][6],false, true)

}