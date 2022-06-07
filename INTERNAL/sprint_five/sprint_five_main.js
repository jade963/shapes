let BRectangle = new Button(22,22,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Rectangle","rgb(255,255,255)")
let BEllipse = new Button(22,66,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Ellipse","rgb(255,255,255)")
let BLine = new Button(22,110,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Line","rgb(255,255,255)")
let BEmpty_1 = new Button(22,154,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
Button.selected = BRectangle
// a shape should be selected for the user before starting so they are not confused

let TStroke = new Toggler(22,198,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Stroke")
let TFill = new Toggler(148.5,198,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Fill")
// stroke and fill need to start switched "on" so the user is not confused
TStroke.status = "on"
TFill.status = "on"

let G = new Grid(275,0,width,height,25, "rgb(0,0,0)", 0.3)
let M = new Main()
let grid_borderLine = new Line(275,0,275,height,"rgb(0,0,0)",6)

let stroke_chooser = new Colour_Button(22,242,104.5,22,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Edit stroke colour",
    "rgb(255,255,255)")
let fill_chooser = new Colour_Button(148.5,242,104.5,22,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Edit fill colour",
    "rgb(255,255,255)")
Colour_Button.selected = fill_chooser

// draws colour palette in a grid pattern
let colour_set = []
for(let i = 0; i<colArray[0].length/3; i++){
    let temp = new Swatch(38.5+44*i,286,22,22,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
for(let i = colArray[0].length/3; i<colArray[0].length/3*2; i++){
    let temp = new Swatch(38.5+44*(i-5),330,22,22,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
for(let i = colArray[0].length/3*2; i<colArray[0].length; i++){
    let temp = new Swatch(38.5+44*(i-10),374,22,22,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
Swatch.selected = colour_set[12]

let BEmpty_2 = new Button(22,418,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_3 = new Button(22,440,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_4 = new Button(22,462,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_5 = new Button(148.5,418,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_6 = new Button(148.5,440,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_7 = new Button(148.5,462,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")

let BEmpty_8 = new Button(22,506,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")
let BEmpty_9 = new Button(148.5,506,104.5,22,0,2,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Placeholder","rgb(255,255,255)")

let Clear = new shortClick_Button(22,550,62.33,22,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Clear",
    "rgb(255,255,255)")
let Undo = new shortClick_Button(106.33,550,62.33,22,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Undo",
    "rgb(255,255,255)")
let Redo = new shortClick_Button(190.67,550,62.33,22,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Redo",
    "rgb(255,255,255)")

function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    BRectangle.update()
    BEllipse.update()
    BLine.update()
    BEmpty_1.update()
    BEmpty_2.update()
    BEmpty_3.update()
    BEmpty_4.update()
    BEmpty_5.update()
    BEmpty_6.update()
    BEmpty_7.update()
    BEmpty_8.update()
    BEmpty_9.update()
    TStroke.update()
    TFill.update()
    stroke_chooser.update()
    fill_chooser.update()
    Clear.update()
    Undo.update()
    Redo.update()
    window.requestAnimationFrame(animate)
    for(let i = 0; i<colour_set.length; i++){
        colour_set[i].update();
    }
    grid_borderLine.update()
    M.update();
}

animate()