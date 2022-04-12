console.log('main.js is called')
let G = new Grid(width, height, 25, "rgb(0,0,0)", 0.3)
let M = new Main()
let Rectangle = new Button(300, 225, 200, 50, "rgb(0,0,0)")
let Circle = new Button(x,y,w,h,fillC,over,selected,strokeC,text,textColour)

function animate(){
    console.log("animate.js is called")
    ctx.clearRect(0,0,width,height);
    G.update();
    M.update();
    window.requestAnimationFrame(animate)
}

animate()