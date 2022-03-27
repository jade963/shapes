console.log('main js is called')
let G = new Grid(width, height, 25, colArray[0][2], 0.3)
G.update()
let ball = new MovingBall(200, 150, 25, "rgb(0,255,0)", 100, 300)
let ball2 = new MovingBallBoth(300,150,50,"rgb(255,0,0)", 100, 300, 0.5)
let ballz = new BallGroup(350,150,300,"rgb(255,0,0)", 100, 300, 0.5)

function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    ball.update();
    ball2.update();
    ballz.update();
    window.requestAnimationFrame(animate)
}
animate()
