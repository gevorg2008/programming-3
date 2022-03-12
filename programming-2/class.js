class Grass{
    constructor(x, y) {
       this.x = x;
       this.y = y;
       this.multiplay = 0;
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x    , this.y - 1], 
           [this.x + 1, this.y - 1], 
           [this.x - 1, this.y    ], 
           [this.x + 1, this.y    ], 
           [this.x - 1, this.y + 1], 
           [this.x    , this.y + 1], 
           [this.x + 1, this.y + 1] 
       ];  
    }
    search(char){
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    mul(){
        let found = this.search(0);
        let foundRand = random(found);
        this.multiplay ++;
        if(this.multiplay >= 2 && foundRand){
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 1;
            let gr = new Grass(x, y)
            grassArr.push(gr);
            this.multiplay = 0;
        }
    }
}
class GrassEater{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 15
        this.directions = []
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char){
        let found = [];
        this.getNewCoordinates()
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    mul(){
        let found = this.search(0);
        let foundRand = random(found);
        if(foundRand){
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2;
            let gr = new GrassEater(x, y)
            grassEaterArr.push(gr);
            this.energy = 15
        }
    }
    move(){
        this.energy --
        let found = this.search(0);
        let foundRand = random(found);
        if(foundRand && this.energy > 0){
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
        else{
            this.die()
        }
    }
    eat(){
        let found = this.search(1);
        let foundRand = random(found);
        if(foundRand){
            this.energy ++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }   
            if(this.energy >= 22){
                this.mul()
            }        
        }
        else{
            this.move()
        }
    }
    die(){
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                matrix[this.y][this.x] = 0
                grassEaterArr.splice(i, 1);
                break;
            }
        } 
    }
}
class Predator{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char){
        let found = [];
        this.getNewCoordinates()
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    mul(){
        let found = this.search(0);
        let foundRand = random(found);
        if(foundRand){
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            let gr = new Predator(x, y)
            predatorArr.push(gr);
            this.energy = 10
        }
    }
    move(){
        this.energy --
        let found = this.search(0);
        let foundRand = random(found);
        if(foundRand && this.energy > 0){
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
        else{
            this.die()
        }
    }
    eat(){
        let found = this.search(1);
        let foundRand = random(found);
        let found1 = this.search(2);
        let foundRand1 = random(found1)
        if(foundRand){
            this.energy ++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }   
            if(this.energy >= 22){
                this.mul()
            }        
        }
        else if(foundRand1){
            this.energy ++
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }   
            if(this.energy >= 22){
                this.mul()
            }
        }
        else{
            this.move()
        }
    }
    die(){
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                matrix[this.y][this.x] = 0
                predatorArr.splice(i, 1);
                break;
            }
        } 
    }
}
class Water{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 8
        this.directions = []
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char){
        let found = [];
        this.getNewCoordinates()
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    GrassCreate(){
        let found = this.search(0)
        let foundRand = random(found)
        this.energy --
        if(foundRand && this.energy >= 0){
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
        }
        else{
            this.die()
        }
    }
    die(){
        for (var i in waterArr) {
            if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                matrix[this.y][this.x] = 0
                waterArr.splice(i, 1);
                break;
            }
        } 
    }
}
class Bomb{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 0
        this.directions = []
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char){
        let found = [];
        this.getNewCoordinates()
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] !== char) {
                    found.push(this.directions[i]);
                }
            } 
        }
        return found;
    }
    boom(){
        let found = this.search(0)
        this.energy ++
        if(found && this.energy == 8){
            for(let i in found){
                if(found[i]){
                    let x = found[i][0]
                    let y = found[i][1]
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                        matrix[y][x] = 0
                    }
                }
            }
            this.die()
        }
    }
    die(){
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                matrix[this.y][this.x] = 0
                bombArr.splice(i, 1);
                break;
            }
        } 
    }
}