let BRectangle = new Button(25,25,225,40,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Rectangle","rgb(255,255,255)")
let BEllipse = new Button(25,90,225,40,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Ellipse","rgb(255,255,255)")
let BLine = new Button(25,155,225,40,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Line","rgb(255,255,255)")
Button.selected = BRectangle
// a shape should be selected for the user before starting so they are not confused

let TStroke = new Toggler(25,220,100,40,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Stroke")
let TFill = new Toggler(150,220,100,40,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Fill")
// stroke and fill need to start switched "on" so the user is not confused
TStroke.status = "on"
TFill.status = "on"

let G = new Grid(275,0,width,height,25, "rgb(0,0,0)", 0.3)
let M = new Main()
let grid_borderLine = new Line(275,0,275,height,"rgb(0,0,0)",6)

let stroke_chooser = new Colour_Button(25,285,100,40,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Edit stroke colour",
    "rgb(255,255,255)")
let fill_chooser = new Colour_Button(150,285,100,40,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Edit fill colour",
    "rgb(255,255,255)")
Colour_Button.selected = fill_chooser

// draws colour palette in a grid pattern
let colour_set = []
for(let i = 0; i<colArray[0].length/3; i++){
    let temp = new Swatch(25+50*i, 350,25,25,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
for(let i = colArray[0].length/3; i<colArray[0].length/3*2; i++){
    let temp = new Swatch(25+50*(i-5),400,25,25,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
for(let i = colArray[0].length/3*2; i<colArray[0].length; i++){
    let temp = new Swatch(25+50*(i-10),450,25,25,2,4,colArray[0][i],colArray[0][12],
        colArray[0][13],colArray[0][12])
    colour_set.push(temp);
}
Swatch.selected = colour_set[12]

let Clear = new shortClick_Button(25,500,60,40,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Clear",
    "rgb(255,255,255)")
let Undo = new shortClick_Button(107.5,500,60,40,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Undo",
    "rgb(255,255,255)")
let Redo = new shortClick_Button(190,500,60,40,0,6,"rgb(0,0,0)",
    "rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Redo",
    "rgb(255,255,255)")

function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    BRectangle.update()
    BEllipse.update()
    BLine.update()
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