console.log('main js is called')
let G = new Grid(width, height, 25, colArray[0][2], 0.3)
let B1 = new InteractiveButton(300, 225, 200, 50, colArray[0][3],  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'Red', colArray[0][2])
let B2 = new InteractiveButton(300, 275, 200, 50, colArray[0][6],  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'Green', colArray[0][2])
let B3 = new InteractiveButton(300, 325, 200, 50, colArray[0][5],  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'Blue', colArray[0][2])
let B4 = new InteractiveButton(500, 225, 200, 50, "rgb(255,165,0)",  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'Orange', colArray[0][2])
let B5 = new InteractiveButton(500, 275, 200, 50, "rgb(216,191,216)",  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'Purple', colArray[0][2])
let B6 = new InteractiveButton(500, 325, 200, 50, "rgb(255,255,255)",  colArray[0][4],  colArray[0][8], "rgb(0,255,0)", 'White', colArray[0][2])
let R1 = new Manager()


function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    B1.update();
    B2.update();
    B3.update();
    B4.update();
    B5.update();
    B6.update();
    R1.update();
    window.requestAnimationFrame(animate)
}

animate()