/**
 * This is a "control class" that regulates all happenings.
 * @param this.w = width
 * @param this.h = height
 * @param this.rotation = pre-rotation of a shape
 * @param this.startAngle = for an ellipse; must be 0
 * @param this.endAngle = for an ellipse; defines the length of the arc
 * @param this.objectSet = list of
 **/
class Main extends InteractiveObject{
    constructor(){
        super()
        // All variables are set to placeholder empty/zero values to allow for easy editing later.
        this.w = 0;
        this.h = 0;
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
        this.objectSet = [];
        this.shapeChoice = "";
        this.fillChoice = "";
        this.strokeChoice = "";
        this.fillColour = colArray[14];
        this.strokeColour = colArray[12];
        this.edit_colourChoice = "";
        this.changeChoice = "";
        this.fillSet = [];
        this.strokeSet = [];
        this.inBounds = false;
        this.removedSet = [];
        this.lineWidth = 0;
        this.dash = "";
    }
    getBoundary(x,y,w,h,x_m,y_m){
        return x_m > x && x_m < x + w && y_m > y && y_m < y + h;
    }
    /* When the user clicks on the canvas to start drawing their shape, obtains all necessary information from the
    buttons as to how the shape should be drawn.*/
    mDown(e) {
        super.mDown(e);
        this.shapeChoice = Button.selected.text;
        this.lineWidth = strokeWidth_Button.selected.text;
        this.dash = strokeStyle_Button.selected.text;
        shortClick_Button.selected = null;
        this.changeChoice = null;
    }
    mClick(e){
        this.edit_colourChoice = Colour_Button.selected.text;
    }
    // Draws a shape when the mouse has been released based on information from the buttons.
    mUp(e){
        super.mUp(e);
        if (shortClick_Button.selected != null){
            this.changeChoice = shortClick_Button.selected.text;
        }
        if (this.changeChoice === "Clear"){
            this.objectSet = []
            this.removedSet = []
        }
        else if (this.changeChoice === "Undo"){
            if (this.objectSet.length > 0) {
                this.removedSet.push(this.objectSet[this.objectSet.length - 1])
            }
            this.objectSet.pop()
        }
        else if (this.changeChoice === "Redo"){
            if (this.removedSet.length > 0){
                this.objectSet.push(this.removedSet[this.removedSet.length - 1])
                this.removedSet.pop()
            }
        }
        let lineWidth = this.lineWidth
        if (lineWidth === "Fine line"){
            this.lineWidth = 2
        }
        if (lineWidth === "Medium line"){
            this.lineWidth = 10
        }
        if (lineWidth === "Thick line"){
            this.lineWidth = 20
        }
        let dash = this.dash
        if (dash === "Small dash"){
            this.dash = "small"
        }
        else if (dash === "Large dash"){
            this.dash = "large"
        }
        /* EXPERIMENTAL - to be expanded - transparent colours
        let alpha = 0.5
        let digits = fillColour.match(/\d+(?=,)|(\d+(\.\d+))+/g);
        digits = fillColour.match( / \d+/g   );
        console.log(fillColour)
        console.log(digits)
        let transparent = `rgba(${digits[0]},${digits[1]},${digits[2]},${alpha})`
        console.log(transparent)
        "rgba(237,89,80, 1)"
        "rgba(237,89,80,0.5)"*/
        // var strokeColour and fillColour = colour of stroke or fill (matches the colour of the selected Swatch)
        let strokeColour = this.strokeColour
        let fillColour = this.fillColour
        // var selectedSwatch - only applicable if shapeChoice is "Line"
        let selectedSwatch = Swatch.selected.fillC;
        // if the user has pressed a button to allow them to change their stroke or fill colour
        if (this.edit_colourChoice === "Edit stroke colour"){
            strokeColour = Swatch.selected.fillC
            this.strokeSet = [strokeColour]
            fillColour = this.fillSet[0]
        }
        else if (this.edit_colourChoice === "Edit fill colour"){
            fillColour = Swatch.selected.fillC
            this.fillSet = [fillColour]
            strokeColour = this.strokeSet[0]
        }
        // gets information from Toggler class - turns stroke or fill on or off
        if (TStroke.fullText === "Stroke on"){
            this.strokeChoice = true;
        }
        else if (TStroke.fullText === "Stroke off"){
            this.strokeChoice = false;
        }
        if (TFill.fullText === "Fill on"){
            this.fillChoice = true;
        }
        else if (TFill.fullText === "Fill off"){
            this.fillChoice = false;
        }
        if (this.inBounds === true){
            if (this.shapeChoice === "Rectangle"){
                let temp = new Rectangle(this.xStart,this.yStart,this.h,this.w,this.fillChoice,this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash)
                this.objectSet.push(temp)
            }
            else if (this.shapeChoice === "Ellipse"){
                let temp = new Ellipse(this.xC,this.yC,this.radiusX,this.radiusY,this.rotation,this.startAngle,
                    this.endAngle,this.fillChoice,this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash)
                this.objectSet.push(temp)
            }
            else if (this.shapeChoice === "Line"){
                let temp = new Line(this.xStart,this.yStart,this.x2,this.y2,selectedSwatch,this.lineWidth, this.dash)
                this.objectSet.push(temp)
            }
        }
    }
    mLeave(e){
        if(this.mouseIsDown) {
            this.mUp(e)
            this.inBounds = false
            this.mouseIsDown = false
        }
    }
    /* Function updates the "guide" shapes after the mouse is clicked to draw a shape (mDown), but before it is
     released (mUp) */
    /**
     * @param this.x2 = x-coordinate of the mouse (used only for drawing lines)
     * @param this.y2 = y-coordinate of the mouse (used only for drawing lines)
     * @param this.w = width of the guide shape
     * @param this.h = height of the guide shape
     * @param this.radiusX = horizontal radius of the temporary ellipse
     * @param this.radiusY = vertical radius of the temporary ellipse
     * @param this.xC = x-coordinate of the guide circle or temporary ellipse (as they are drawn from the centre)
     * @param this.yC = y-coordinate of the guide circle or temporary ellipse
     */
    update(){
        ctx.save()
        ctx.beginPath();
        ctx.rect(275,0,1000-275,600)
        ctx.clip()
        this.x2 = this.xMouse;
        this.y2 = this.yMouse;
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        this.radiusX = Math.abs(this.w/2);
        this.radiusY = Math.abs(this.h/2);
        this.xC = this.xStart+this.w/2;
        this.yC = this.yStart+this.h/2;
        // "true" distance values for width and height, ignoring negatives
        let h_true = Math.abs(this.h)
        let w_true = Math.abs(this.w)
        // ensures the guide circle resizes appropriately if the width or height is negative
        if(this.h < 0 || this.w < 0){
            if (w_true<h_true){
                this.r = w_true/10
            }
            else if (h_true<w_true){
                this.r = h_true/10
            }
        }
        else if(this.h > 0 && this.w > 0){
            if(this.h < this.w){
                this.r = Math.abs(this.h/10)
            }
            else if(this.h > this.w){
                this.r = Math.abs(this.w/10)
            }
        }
        // updates the values for the object being drawn
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update()
        }
        if (this.mouseIsDown){
            this.inBounds = this.getBoundary(275,0,1000,600,this.xStart,this.yStart)
            if (this.inBounds === true){
                this.draw()
            }
        }
        ctx.restore()

    }
    draw() {
        let x = this.xStart
        let y = this.yStart
        let w = this.w
        let h = this.h
        let r = this.r
        let rX = this.radiusX
        let rY = this.radiusY
        let rotation = this.rotation
        let startAngle = this.startAngle
        let endAngle = this.endAngle
        let xC = this.xC
        let yC = this.yC
        let x2 = this.x2
        let y2 = this.y2
        // draws temporary "guide shapes" based on the choice of shape
        if (this.shapeChoice === "Rectangle"){
            this.tempRect(x,y,w,h);
            this.tempLine(x,y,x+w,y+h)
            this.tempLine(x,y+h,x+w,y)
            this.tempCircle(x+w/2,y+h/2,r)
        }
        else if (this.shapeChoice === "Ellipse"){
            this.tempEllipse(xC,yC,rX,rY,rotation,startAngle,endAngle)
            this.tempRect(x,y,w,h);
            this.tempLine(x+w/2,y,x+w/2,y+h)
            this.tempLine(x,y+h/2,x+w,y+h/2)
            this.tempCircle(x+w/2,y+h/2,r)
        }
        else if (this.shapeChoice === "Line"){
            this.tempLine(x,y,x2,y2)
        }
    }
}
Main.prototype.tempRect = tempRect
Main.prototype.tempLine = tempLine
Main.prototype.tempCircle = tempCircle
Main.prototype.tempEllipse = tempEllipse