class Button extends InteractiveObject {
    constructor(x, y, w, h, fillC, over, selected, strokeC, text, textColour) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillC = fillC;
        this.current_fill = fillC;
        this.over = over;
        this.selected = selected;
        this.strokeC = strokeC;
        this.text = text;
        this.textColour = textColour;
        this.inBounds = false;
    }
    update(){
        // checks if get_boundary is true or false
        this.inBounds = this.getBoundary(this.x,this.y, this.w, this.h,
            this.xMouse, this.yMouse)
        let fill = this.fill;
        // changes colour of button based on whether colour is being hovered over or just selected
        if(Button.selected === this){
            fill = this.selected
        }
        else if (this.inBounds){
            fill = this.over
        }
        this.draw(this.x,this.y,this.w,this.h,fill, this.stroke,this.text,
            this.textColour)
    }
    mClick(){
        if(this.inBounds){
            Button.selected = this;
        }
    }
    // checks if location of the mouse (x_m,y_m) is inside the buttons' boundaries (x,y,w,h) and returns
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m>x && x_m<x+w && y_m>y && y_m<y+h){
            return true;
        }
        else{
            return false;
        }
    }
    draw(x,y,w,h,fillC,strokeC, text, textColour){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.stroke();
        let myFont = "bold 50 px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        ctx.fillStyle = textColour;
        ctx.fillText(text, x + w/2, y + h/2)
    }
}
Button.selected = null;