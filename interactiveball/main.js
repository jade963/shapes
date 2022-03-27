console.log('main js is called')
let G = new Grid(width, height, 25, colArray[0][2], 0.3)
let E = new InteractiveBall(200, 150, 20, colArray[1][7], colArray[1][3], 3)
let C = new InteractiveBall(500, 200, 20, colArray[1][3], colArray[1][7], 3)

function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    E.update();
    C.update();
    window.requestAnimationFrame(animate)
}

animate()
