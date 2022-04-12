/**
 * Captures mouse events
 * Note that there are no parameters for the constructor
 * There is no update function - events are independent of the animation frame
 **/
class InteractiveObject{
    constructor(){
        // this listens for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        // variables to hold where the mouse was first clicked down
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e){
        console.log("Mouse down")
        // update positions (so this can be used in another object)
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
    }
    mUp(e){
        console.log("Mouse up")
        this.mouseIsDown = false;
    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        console.log("moving");
    }
    mLeave(e){
        // this might be a useful safety feature
        this.mouseIsDown = false;
        console.log("Mouse has left the canvas")
    }
}
