var matrix = [];
 
var side = 20;
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let waterArr = []
let bombArr = []
createMatrix(50, 50)

console.log(matrix)

function setup() { 
    frameRate(10);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac')
}



function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("white");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for(let i in grassArr){
        grassArr[i].mul()
    }
    for(let i in grassEaterArr){
        grassEaterArr[i].eat()
    }
    for(let i in predatorArr){
        predatorArr[i].eat()
    }
    for(let i in waterArr){
        waterArr[i].GrassCreate()
    }
    for(let i in bombArr){
        bombArr[i].boom()
    }
}

function createMatrix(n, k) {
	for(let i = 0; i < n; i++){
		matrix[i] = []
		for (let m = 0; m < k; m++) {
			/*var g = Math.floor(Math.random() * 2)
            if(g == 1){
                grassArr.push(new Grass(m, i))
            }
            matrix[i][m] = g*/
            matrix[i][m] = 0
		}
	}
}

function createGrass(){
    let x = Math.floor(Math.random() * (matrix.length + 1))
    let y = Math.floor(Math.random() * (matrix[0].length + 1))
    if(matrix[y][x] == 0){
        matrix[y][x] = 1
        let gr = new Grass(x, y)
        grassArr.push(gr)
    }
    else{
        createGrass()
    }
}
function createGrassEater(){
    let x = Math.floor(Math.random() * (matrix.length + 1))
    let y = Math.floor(Math.random() * (matrix[0].length + 1))
    if(matrix[y][x] == 0){
        matrix[y][x] = 2
        let gre = new GrassEater(x, y)
        grassEaterArr.push(gre)
    }
    else if(matrix[y][x] == 1){
        matrix[y][x] = 2
        let gre = new GrassEater(x, y)
        grassEaterArr.push(gre)
    }
    else{
        createGrassEater()
    }
}
function createPredator(){
    let x = Math.floor(Math.random() * (matrix.length + 1))
    let y = Math.floor(Math.random() * (matrix[0].length + 1))
    if(matrix[y][x] == 0){
        matrix[y][x] = 3
        let pr = new Predator(x, y)
        predatorArr.push(pr)
    }
    else if(matrix[y][x] == 1){
        matrix[y][x] = 3
        let pr = new Predator(x, y)
        predatorArr.push(pr)
    }
    else if(matrix[y][x] == 2){
        matrix[y][x] = 3
        let pr = new Predator(x, y)
        predatorArr.push(pr)
    }
    else{
        createGPredator()
    }
}
function createWater(){
    let x = Math.floor(Math.random() * (matrix.length + 1))
    let y = Math.floor(Math.random() * (matrix[0].length + 1))
    if(matrix[y][x] == 0){
        matrix[y][x] = 4
        let gr = new Water(x, y)
        waterArr.push(gr)
    }
    else{
        createWater()
    }
}
function createBomb(){
    let x = Math.floor(Math.random() * (matrix.length + 1))
    let y = Math.floor(Math.random() * (matrix[0].length + 1))
    matrix[y][x] = 5
    let gr = new Bomb(x, y)
    bombArr.push(gr)
}