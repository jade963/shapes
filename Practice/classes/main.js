console.log("main js is called")

let A = new Ball(200,200,50,colArray[0][8])
A.area();
A.update()

/*let ball_set = [];
for(let i = 0; i<12; i++){
    let c = i%colArray[0].length
    let temp = new Ball(60+i*60, 400, 25, colArray[0][c])
    ball_set.push(temp);
}

for(let j = 0; j<ball_set.length; j++){
    ball_set[j].update();
}*/

let ball_set = [];
for(let i = 0; i<colArray.length; i++){
    for(let j = 0; j<colArray[i].length; j++){
        let temp = new Ball(200+60*j, 300+60*i, 25, colArray[i][j])
        ball_set.push(temp);
    }
    for(let i = 0; i<ball_set.length; i++){
        ball_set[i].update();
    }
}
