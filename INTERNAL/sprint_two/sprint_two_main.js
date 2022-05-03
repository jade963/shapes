
let BRectangle = new Button(25,25,200,50,"rgb(0,0,0)","rgb(100,100,100)",
    "rgb(200,200,200)","Rectangle","rgb(255,255,255)")
let BEllipse = new Button(25,100,200,50,"rgb(0,0,0)","rgb(100,100,100)",
    "rgb(200,200,200)","Ellipse","rgb(255,255,255)")
let BLine = new Button(25,175,200,50,"rgb(0,0,0)","rgb(100,100,100)",
    "rgb(200,200,200)","Line","rgb(255,255,255)")

let G = new Grid(width, height, 25, "rgb(0,0,0)", 0.3)
let M = new Main()

function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    M.update();
    BRectangle.update()
    BEllipse.update()
    BLine.update()
    window.requestAnimationFrame(animate)
}

animate()