class InteractiveObject{
    constructor(){
        // this listens for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        // variables to hold where the mouse was first clicked down
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mClick(){}
    mDown(e){
        //console.log("Mouse down")
        // update positions (so this can be used in another object)
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
    }
    mUp(e){
        //console.log("Mouse up")
        this.mouseIsDown = false;
    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving");
    }
    mLeave(e){
        // this might be a useful safety feature
        this.mouseIsDown = false;
        //console.log("Mouse has left the canvas")
    }
}

/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {number} fill fill colour
 * @param {number} over hover over colour
 * @param {number} selected button has been clicked colour
 * @param {number} stroke stroke colour
 * @param {number} text button text
 * @param {number} text button text colour
 */

class InteractiveButton extends InteractiveObject {
    constructor(x, y, w, h, fill, over, selected, stroke, text, textColour) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.current_fill = fill;
        this.over = over;
        this.selected = selected;
        this.stroke = stroke;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false;
    }
    update(){
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)
        let fill = this.fill;
        if(InteractiveButton.selected ===this){
            fill = this.selected
        }else if (this.inBounds){
            fill =this.over
        }
        this.draw(this.x,this.y,this.w,this.h,fill, this.stroke,this.text,
            this.textColour)
    }
    mClick(){
        if(this.inBounds){
            InteractiveButton.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m>x && x_m < x+ w && y_m > y && y_m < y +h){
            return true;
        }
        else{
            return false;
        }
    }

    draw(x,y,w,h,c,s, txt, txtCol){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle =c;
        ctx.fill();
        ctx.stroke();

        let myFont = "bold 50 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;

        ctx.fillStyle = txtCol;
        ctx.fillText(txt, x + w/2, y + h/2)
    }
}
InteractiveButton.selected = null;

class Manager extends InteractiveObject {
    constructor(x, y, w, h, fill) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.current_fill = fill;
        this.leftRectangle = new Rectangle(10, 10, 250, 400, "rgb(255,255,255)")
        this.rightRectangle = new Rectangle(700, 10, 250, 400, "rgb(255,255,255)")
    }
    update(){
        this.leftRectangle.update();
        this.rightRectangle.update();

    }
    mClick() {
        let name = InteractiveButton.selected.text;
        console.log(name)
        if (name === "Red") {
            this.leftRectangle.fill = "rgb(255,0,0)"
        } else if (name === "Green") {
            this.leftRectangle.fill = "rgb(0,255,0)"
        } else if (name === "Blue") {
            this.leftRectangle.fill = "rgb(0,0,255)"
        } else if (name === "Orange") {
            this.rightRectangle.fill = "rgb(255,165,0)"
        } else if (name === "Purple") {
            this.rightRectangle.fill = "rgb(216,191,216)"
        } else if (name === "White") {
            this.rightRectangle.fill = "rgb(0,0,0)"
        }
    }
}

class Rectangle{

    constructor(x,y,w,h,fill,){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update(){
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

}

InteractiveButton.selected = null;