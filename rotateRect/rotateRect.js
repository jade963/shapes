console.log("rotateRect js is called")

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

// rotate a rectangle from the centre
function rotateRect(x, y, w, h, fillC, strokeC, fill, stroke, rotation){
    ctx.save()
    ctx.translate(x+w/2, y+h/2)
    ctx.rotate(rotation*Math.PI/180)
    drawRect(-w*0.5, -h*0.5, w, h, fillC, strokeC, fill, stroke, rotation)
    ctx.restore()
}

rotateRect(300,200, 50, 50, colArray[1][1], colArray[1][9], true, true, 45)