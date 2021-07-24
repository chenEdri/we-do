
export const utilService={
    getRandomColor,
    getRandomNumber,
    findIdxById
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomNumber(min, max){
      return Math.floor(Math.random()*(max-min)+min);
  }

  
function findIdxById(arr, id){
    return arr.findIndex(item=> item._id === id)
}