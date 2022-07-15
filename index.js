const coords = document.getElementById('coords');
const sendButton = document.getElementById('send');
const result = document.getElementById('result');

let fileContentArray = [];

document.getElementById('file').onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
        coords.innerHTML = this.result;
        fileContentArray = this.result.split(/\r\n|\n/);
        fileContentArray = fileContentArray.filter((item, index) => {
            return fileContentArray.indexOf(item) === index;
        })
        fileContentArray[1] = fileContentArray.length - 2;        
    }
    reader.readAsText(file);
};


let dataX = [];
let dataY = [];
sendButton.onclick = function(){
    // const tests  = Number(fileContentArray[0]);
    const tests = 1;
    let lines = Number(fileContentArray[1]);
    let actualposition = 2;
    for (let i = 0; i < tests; i++) {
        for (let j = actualposition; j < Number(lines+actualposition); j++) {
            let data = fileContentArray[j].split(' ');
            dataX.push(data[0])
            dataY.push(data[1])
        }
        actualposition = actualposition + lines + 1;
        lines = fileContentArray[actualposition];
    }
    findArchipielago(dataX, dataY);
}

function distance( x1, y1, x2, y2 ) {
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

function findArchipielago(X, Y) {
    let archipielagosFound = 0;
    for (let i = 0; i < (X.length - 2); i++) {
        for (let j = i+1 ; j < (X.length - 1) ; j++) {
            for (let k = j + 1; k < X.length; k++) {
                if ((distance(X[i], Y[i], X[j], Y[j]) == distance(X[j], Y[j], X[k], Y[k])) 
                || (distance(X[j], Y[j], X[i], Y[i]) == distance(X[i], Y[i], X[k], Y[k]) )
                || (distance(X[i], Y[i], X[k], Y[k]) == distance(X[k], Y[k], X[j], Y[j]) )) {
                    archipielagosFound ++;
                }
            }
        }
    }
    result.innerHTML = archipielagosFound;
    dataX = [];
    dataY = [];
}