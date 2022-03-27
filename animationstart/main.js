console.log("main js is called")

let G = new Grid(width, height, 25, colArray[0][2], 0.3)
let T = new TextBox(800,550,200, colArray[0][4], colArray[0][2])
G.update()
T.update("my text")

//animation function
function animate(t){
    ctx.clearRect(0,0,width,height);
    G.update();
    let timer = Math.round(t)
    T.update(timer);
    window.requestAnimationFrame(animate)
}
animate()