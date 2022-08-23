/**
 * "Control class" that connects the buttons to their functions & allows user to draw shapes
 * @param {number} this.rotation = the degree to which the ellipse is rotated (nearly always 0 so set to 0 in
 * constructor)
 * @param {number} this.startAngle = the startAngle of all elliptical shapes (always 0 so set to 0 in constructor)
 * @param {number} this.endAngle = the ending angle of all elliptical shapes (nearly always 2*Math.PI so set to that in
 * constructor)
 * @param {array} this.objectSet = list containing all shapes on the canvas as they are drawn
 * @param {array} this.fillColour = fill colour of shapes (pre-set to white when the program starts, can be changed)
 * @param {array} this.strokeColour = string - stroke colour of shapes (pre-set to black when the program starts, can be
 * changed)
 * @param {array} this.fillSet = array containing all previous values for this.fillColour
 * @param {array} this.strokeSet = array containing all previous values for this.strokeColour
 * @param {boolean} this.inBounds = boolean determines if the mouse is inside the bounds of the drawing area
 * @param {array} this.removedSet = array containing a list of objects that have been removed from the objectSet
 * @param {string} this.shapeChoice = the shape the program will draw
 * @param {number} this.lineWidth determines
 * @param {string} this.dash determines whether the outline of the shape is dashed or solid
 * @param {string} this.changeChoice registers if the user would like to (either) undo, redo, or clear their work.
 * @param {boolean} this.amIDrawing checks if the user is currently drawing
 **/
class Main extends InteractiveObject{
    constructor(){
        super();
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
        this.objectSet = [];
        this.fillColour = colArray[14];
        this.strokeColour = colArray[12];
        this.fillSet = [];
        this.strokeSet = [];
        this.inBounds = false;
        this.removedSet = [];
    }
    /* When the user clicks on the canvas to start drawing their shape, obtains all necessary information from the
    buttons as to how the shape should be drawn.*/
    mDown(e) {
        super.mDown(e);
        if (Button.selected){
            this.shapeChoice = Button.selected.text;
        }
        /* if a regular Button is not selected, iterates over the list of potential multi_Buttons and finds out which
        is selected in order to identify shapeChoice.
        Must be updated manually when new multi_Buttons are added.
        */
        else if (Button.selected === null) {
            let multiButton_list = [BStickArrow,BThickArrow,BFull,BHalf,BQuarter,B4,B5,B6,B7,B8];
            for (let i=0; i<multiButton_list.length; i++){
                if (multiButton_list[i].selected){
                    this.shapeChoice = multiButton_list[i].text;
                }
            }
        }
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
        // Undo, redo, and clear
        if (shortClick_Button.selected != null){
            this.changeChoice = shortClick_Button.selected.text;
        }
        if (this.changeChoice === "Clear"){
            this.objectSet = [];
            this.removedSet = [];
        }
        else if (this.changeChoice === "Undo"){
            if (this.objectSet.length > 0) {
                this.removedSet.push(this.objectSet[this.objectSet.length - 1]);
            }
            this.objectSet.pop();
        }
        else if (this.changeChoice === "Redo"){
            if (this.removedSet.length > 0){
                this.objectSet.push(this.removedSet[this.removedSet.length - 1]);
                this.removedSet.pop();
            }
        }
        // Setting lineWidth
        let lineWidth = this.lineWidth;
        if (lineWidth === "Fine line"){
            this.lineWidth = 2;
        }
        if (lineWidth === "Medium line"){
            this.lineWidth = 10;
        }
        if (lineWidth === "Thick line"){
            this.lineWidth = 20;
        }
        // Setting dash
        let dash = this.dash;
        if (dash === "Small dash"){
            this.dash = "small";
        }
        else if (dash === "Large dash"){
            this.dash = "large";
        }
        else if (dash === "Solid line"){
            this.dash = "solid";
        }
        // Setting shape colours
        let strokeColour = this.strokeColour;
        let fillColour = this.fillColour;
        let selectedSwatch = Swatch.selected.fillC;
        if (this.edit_colourChoice === "Edit stroke colour"){
            strokeColour = Swatch.selected.fillC;
            this.strokeSet = [strokeColour];
            fillColour = this.fillSet[0];
        }
        else if (this.edit_colourChoice === "Edit fill colour"){
            fillColour = Swatch.selected.fillC;
            this.fillSet = [fillColour];
            strokeColour = this.strokeSet[0];
        }
        // Switching stroke and fill on or off
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
        /* checks if the user's mouse went down in the drawing area
        if the mouse went down outside the drawing area, they should not be allowed to produce a shape
         */
        this.amIDrawing = this.getBoundary(275,0,1000-275,600,this.xStart,this.yStart);
        if (this.inBounds === true && this.amIDrawing === true && this.w !== 0 && this.h !== 0){
            if (this.shapeChoice === "Rectangle"){
                let temp = new Rectangle(this.xStart,this.yStart,this.h,this.w,this.fillChoice,this.strokeChoice,
                    fillColour,strokeColour,this.lineWidth,this.dash);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "Line"){
                let temp = new Line(this.xStart,this.yStart,this.x2,this.y2,selectedSwatch,this.lineWidth, this.dash);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "Triangle"){
                let temp = new Triangle(this.xStart+this.w/2,this.yStart,this.xStart+this.w,
                    this.yStart+this.h,this.xStart,this.yStart+this.h,this.fillChoice,this.strokeChoice,
                    fillColour,strokeColour,this.lineWidth,this.dash);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "Stick" || this.shapeChoice === "Thick"){
                let temp = new Arrow(this.xStart,this.yStart,this.xMouse,this.yMouse,this.fillChoice,this.strokeChoice,
                    fillColour,strokeColour,this.lineWidth,this.dash,this.shapeChoice,selectedSwatch);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "Full"){
                let temp = new Ellipse(this.xC,this.yC,this.xMouse,this.yMouse,this.radiusX,this.radiusY,this.rotation,
                    this.startAngle,this.endAngle,this.fillChoice,
                    this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash,this.shapeChoice);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "1/2"){
                let temp = new Ellipse(this.xC,this.yStart,this.xMouse,this.yMouse,this.radiusX,(2*this.radiusY),
                    this.rotation,this.startAngle,this.endAngle,this.fillChoice,
                    this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash,this.shapeChoice);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "1/4"){
                let temp = new Ellipse(this.xStart,this.yStart,this.xMouse,this.yMouse,(2*this.radiusX),
                    (2*this.radiusY),this.rotation,this.startAngle,this.endAngle,this.fillChoice,
                    this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash,this.shapeChoice);
                this.objectSet.push(temp);
            }
            else if (this.shapeChoice === "4" || this.shapeChoice === "5" || this.shapeChoice === "6" ||
                this.shapeChoice === "7" || this.shapeChoice === "8"){
                let temp = new Star(this.outer_radius,this.shapeChoice,this.xC,this.yC,this.fillChoice,
                    this.strokeChoice,fillColour,strokeColour,this.lineWidth,this.dash);
                this.objectSet.push(temp);
            }
        }
    }
    mLeave(e){
        /* If the user leaves the canvas while in the middle of clicking and dragging to draw a shape, the drawing is
        finished automatically by calling mUp().*/
        if(this.mouseIsDown) {
            this.mUp(e);
            this.inBounds = false;
            this.mouseIsDown = false;
        }
    }
    /* Function updates the "guide" shapes after the mouse is clicked to draw a shape (mDown), but before it is
     released (mUp) */
    update(){
        // creates a drawing area that the user cannot draw outside of
        ctx.save();
        ctx.beginPath();
        ctx.rect(278,0,1000-278,600);
        ctx.clip();
        // sets some variables that multiple shapes have in common
        this.x2 = this.xMouse;
        this.y2 = this.yMouse;
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        this.radiusX = Math.abs(this.w/2);
        this.radiusY = Math.abs(this.h/2);
        // "true" distance values for width and height, ignoring negatives
        this.h_true = Math.abs(this.h);
        let h_true = this.h_true;
        this.w_true = Math.abs(this.w);
        let w_true = this.w_true;
        this.xC = this.xStart+this.w/2;
        this.yC = this.yStart+this.h/2;
        // ensures the guide circle $ the star resize appropriately if the width or height is negative
        if(this.h < 0 || this.w < 0){
            if (w_true<h_true){
                this.r = w_true/10;
                this.outer_radius = w_true*0.5;
            }
            else if (h_true<w_true){
                this.r = h_true/10;
                this.outer_radius = h_true*0.5;
            }
        }
        else if(this.h > 0 && this.w > 0){
            if(this.h < this.w){
                this.r = Math.abs(this.h/10);
                this.outer_radius = Math.abs(h_true*0.5);
            }
            else if(this.h > this.w){
                this.r = Math.abs(this.w/10);
                this.outer_radius = Math.abs(w_true*0.5);
            }
        }
        // updates the values for the object being drawn
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.mouseIsDown){
            // before allowing user to draw, checks that the mouse went down initially inside the drawing area
            this.inBounds = this.getBoundary(275,0,1000,600,this.xStart,this.yStart);
            if (this.inBounds === true && this.w != 0 && this.h != 0){
                this.draw();
            }
        }
        ctx.restore();
    }
    // draw function - called when the user clicks and drags inside the drawing area
    draw() {
        let x = this.xStart;
        let y = this.yStart;
        let w = this.w;
        let h = this.h;
        let r = this.r;
        let rX = this.radiusX;
        let rY = this.radiusY;
        let rotation = this.rotation;
        let startAngle = this.startAngle;
        let endAngle = this.endAngle;
        let xC = this.xC;
        let yC = this.yC;
        let x2 = this.x2;
        let y2 = this.y2;
        // draws temporary "guide shapes" based on the choice of shape
        if (this.shapeChoice === "Rectangle") {
            this.tempRect(x, y, w, h);
            this.tempLine(x, y, x + w, y + h);
            this.tempLine(x, y + h, x + w, y);
            this.tempCircle(x + w / 2, y + h / 2, r);
        } else if (this.shapeChoice === "Full") {
            this.tempEllipse(xC,yC,x2,y2,rX,rY,rotation,startAngle,endAngle,this.shapeChoice);
            this.tempRect(x,y,w,h);
            this.tempLine(x+w/2,y,x+w/2,y+h);
            this.tempLine(x,y+h/2,x+w,y+h/2);
            this.tempCircle(x+w/2,y+h/2,r);
        } else if (this.shapeChoice === "1/2") {
            this.tempEllipse(xC, y, x2, y2, rX, rY, rotation, startAngle, endAngle, this.shapeChoice);
            this.tempRect(x, y, w, h);
        } else if (this.shapeChoice === "1/4") {
            this.tempEllipse(x, y, x2, y2, rX, rY, rotation, startAngle, endAngle, this.shapeChoice);
            this.tempRect(x,y,w,h);
        } else if (this.shapeChoice === "Line") {
            this.tempLine(x, y, x2, y2);
        } else if (this.shapeChoice === "Triangle") {
            this.tempRect(x, y, w, h);
            this.tempTriangle(x + w / 2, y, x + w, y + h, x, y + h);
        } else if (this.shapeChoice === "Stick" || this.shapeChoice === "Thick") {
            this.tempArrow(x, y, x2, y2, this.shapeChoice);
        } else if (this.shapeChoice === "4" || this.shapeChoice === "5" || this.shapeChoice === "6" ||
            this.shapeChoice === "7" || this.shapeChoice === "8") {
            this.tempRect(x, y, w, h);
            this.tempStar(this.outer_radius,this.shapeChoice,xC,yC);
        }
    }
}
Main.prototype.tempRect = tempRect;
Main.prototype.tempLine = tempLine;
Main.prototype.tempCircle = tempCircle;
Main.prototype.tempEllipse = tempEllipse;
Main.prototype.tempTriangle = tempTriangle;
Main.prototype.tempArrow = tempArrow;
Main.prototype.tempStar = tempStar;