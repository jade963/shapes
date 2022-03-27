console.log('main js is called')
let G = new Grid(width, height, 25, colArray[0][2], 0.3)
let M = new Main()

function animate(){
    console.log("animate is called")
    ctx.clearRect(0,0,width,height);
    G.update();
    M.update();
    window.requestAnimationFrame(animate)
}

animate()