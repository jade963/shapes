console.log("drawing js is called")

// rectangle
ctx.fillStyle = colArray[4];
ctx.strokeStyle = colArray[5];
ctx.lineWidth = 6;
ctx.beginPath();
ctx.rect(350,225,300,300);
ctx.fill();
ctx.stroke();

// circle
ctx.fillStyle = colArray[4];
ctx.strokeStyle = colArray[5];
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(500,375,75,0, 2*Math.PI);
ctx.fill();
ctx.stroke();

// line
ctx.strokeStyle = colArray[6];
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(350,225)
ctx.lineTo(650,525)
ctx.moveTo(650,225)
ctx.lineTo(350,525)
ctx.stroke();

// access a colour by using the array index
// you can also use colours using  "rgba()"
// for example "rgba(204,0,0, 0.5)" is half transparent
ctx.strokeStyle = colArray[4];
ctx.fillStyle = colArray[5];
ctx.lineWidth = 6;
ctx.beginPath();
ctx.arc(500, 500, 30, 0, 1*Math.PI)
ctx.fill();
ctx.stroke();


