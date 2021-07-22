function getRandomId(){
    let x='';
    for(let i = 0; i<10; i++){
        x += Math.floor(Math.random()*9);
    }
    return x;
}

function getRandomIds(num){
    let arr = [];
    for(let i = 0; i<num; i++){
        let x = getRandomId();
        arr.push(x)
    }
    return arr;
}

function getRandomColor(){
    return randomColor = Math.floor(Math.random()*16777215).toString(16);
}

module.exports={
    getRandomId,
    getRandomIds,
    getRandomColor
}