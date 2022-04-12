console.log("col_array js is called")

function drawRect(x, y, w, h, fillC, fill){
    ctx.beginPath();
    ctx.rect(x, y, w, h)
    if(fill === true){
        ctx.fillStyle = fillC;
        ctx.fill();
    }
}

let x = 50
let y = 50
let s = 50
for(let i=0;i<colArray.length;i++){
    for(let j=0;j<colArray[i].length; j++){
        drawRect(x+j*s,y+i*s, s, s, colArray[i][j], true);
    }
}
