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
        this.fillSet = [];
        this.strokeSet = [];
    }
    /* When the user clicks on the canvas to start drawing their shape, obtains all necessary information from the
    buttons as to how the shape should be drawn.*/
    mClick(){
        this.shapeChoice = Button.selected.text;
        this.edit_colourChoice = Colour_Button.selected.text;
    }
    // Draws a shape when the mouse has been released based on information from the buttons.
    mUp(e, temp){
        super.mUp(e);
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
        let lineWidth = 6
        // if the user has pressed a button to allow them to change their
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
        // gets information from Button class - finds out which shape is to be drawn
        if (this.shapeChoice === "Rectangle"){
            let temp = new Rectangle(this.xStart,this.yStart,this.h,this.w,this.fillChoice,this.strokeChoice,fillColour,strokeColour,lineWidth)
            this.objectSet.push(temp)
        }
        else if (this.shapeChoice === "Ellipse"){
            let temp = new Ellipse(this.xC,this.yC,this.radiusX,this.radiusY,this.rotation,this.startAngle,
                this.endAngle,this.fillChoice,this.strokeChoice,fillColour,strokeColour,lineWidth)
            this.objectSet.push(temp)
        }
        else if (this.shapeChoice === "Line"){
            let temp = new Line(this.xStart,this.yStart,this.x2,this.y2,selectedSwatch,2)
            this.objectSet.push(temp)
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
        // initiates the draw function
        if(this.mouseIsDown){
            this.draw();
        }
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
            this.tempLine(x,y,x+w,y+h)
            this.tempLine(x,y+h,x+w,y)
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