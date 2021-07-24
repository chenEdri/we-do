
import httpService from './httpService';
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/item' : 'http://localhost:3030/api/item';


const resolveData = res => res.data

export const itemService = {
    query,
    getById,
    remove,
    save,
    getEmpty
}
function query(filterBy = {}) {
    const queryStr = Object.keys(filterBy).map((key)=>{
      return `${key}=${filterBy[key]}`
    }).join('&');
    return httpService.get(`item/?${queryStr}`);
  }

function getById(itemId) {
    return httpService.get(`item/${itemId}`, itemId)
}

function remove(itemId) {
    return httpService.delete(`item/${itemId}`)
}

function save(item) {
console.log('item to save-', item);
    if (item._id) {
        return httpService.put(`item/${item._id}`, item)
    } else {
        return httpService.post('item', item)
    }
}


function getEmpty(){
    return  {
        name: '',
        price: 0,
        category: '',
        inStock: false
    }
}
