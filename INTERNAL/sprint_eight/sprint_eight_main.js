let BRectangle = new Button(22,22,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Rectangle","rgb(255,255,255)")
let BLine = new Button(22,80.66,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Line","rgb(255,255,255)")
let BTriangle = new Button(22,137.33,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Triangle","rgb(255,255,255)")
let BArrow = new Multi_Button(148.5,22,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Arrow","rgb(255,255,255)","parent","Arrow")
let BStickArrow = new Multi_Button(148.5,44,52.25,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Stick","rgb(255,255,255)","child","Arrow")
let BThickArrow = new Multi_Button(200.75,44,52.25,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Thick","rgb(255,255,255)","child","Arrow")
let BEllipse = new Multi_Button(148.5,80.66,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Ellipse","rgb(255,255,255)","parent","Ellipse")
let BFull = new Multi_Button(148.5,102.66,34.63,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Full","rgb(255,255,255)","child","Ellipse")
let BHalf = new Multi_Button(183.33,102.66,34.63,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","1/2","rgb(255,255,255)","child","Ellipse")
let BQuarter = new Multi_Button(218.16,102.66,34.63,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","1/4","rgb(255,255,255)","child","Ellipse")
let BStar = new Multi_Button(148.5,137.33,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Star","rgb(255,255,255)","parent","Star")
let B4 = new Multi_Button(148.5,159.33,20.9,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","4","rgb(255,255,255)","child","Star")
let B5 = new Multi_Button(169.4,159.33,20.9,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","5","rgb(255,255,255)","child","Star")
let B6 = new Multi_Button(190.3,159.33,20.9,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","6","rgb(255,255,255)","child","Star")
let B7 = new Multi_Button(211.2,159.33,20.9,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","7","rgb(255,255,255)","child","Star")
let B8 = new Multi_Button(232.1,159.33,20.9,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","8","rgb(255,255,255)","child","Star")
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
Swatch.selected = colour_set[14]

let Small = new strokeWidth_Button(22,418,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Fine line","rgb(255,255,255)")
let Medium = new strokeWidth_Button(22,440,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Medium line","rgb(255,255,255)")
let Large = new strokeWidth_Button(22,462,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Thick line","rgb(255,255,255)")
strokeWidth_Button.selected = Medium

let Solid = new strokeStyle_Button(148.5,418,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Solid line","rgb(255,255,255)")
let BigDash = new strokeStyle_Button(148.5,440,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Small dash","rgb(255,255,255)")
let LittleDash = new strokeStyle_Button(148.5,462,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","Large dash","rgb(255,255,255)")
strokeStyle_Button.selected = Solid

let BGrid = new Toggler(22,506,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Grid")
let BTransparency = new Toggler(148.5,506,104.5,22,0,6,"rgb(0,0,0)","rgb(0,0,0)","rgb(150,150,150)","rgb(200,200,200)","","Transparency")
BTransparency.selected = false

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
    BLine.update()
    BTriangle.update()
    BArrow.update()
    BStickArrow.update()
    BThickArrow.update()
    BEllipse.update()
    BFull.update()
    BHalf.update()
    BQuarter.update()
    BStar.update()
    B4.update()
    B5.update()
    B6.update()
    B7.update()
    B8.update()
    Small.update()
    Medium.update()
    Large.update()
    Solid.update()
    BigDash.update()
    LittleDash.update()
    BGrid.update()
    BTransparency.update()
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