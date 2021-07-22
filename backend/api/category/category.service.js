const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addCategory,
    updateCategory,
    updateTotalExpences,
    removeCategory
}


async function query(filterBy=null) {
    const query = `SELECT * from ${filterBy.catTable} WHERE ${filterBy.catTable}.accountId=${filterBy.accountId}`;
    let categories;
    try {
        categories = await dbService.runSQL(query)
        return categories;
    }
    catch (err) {
        console.log('error with query select Categories', err);
    }
}

async function getById(categoryId, filterBy) {
    const query = `SELECT * from ${filterBy.catTable} WHERE ${filterBy.catTable}.id = ${categoryId}`;
    let category;
    try {
        category = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get category-->', err);
    }
    return category;
}

async function addCategory(category) {
    const query = `INSERT INTO category(totalCategory, totalExpences, isOverCategory) VALUES(${category.totalCategory},${category.totalExpences},${category.isOverCategory})`;
    return dbService.runSQL(query);
}

async function updateCategory(category) {
    let okPacket;
    const query = `UPDATE category SET totalCategory= ${category.totalCategory}, totalExpences= ${category.totalExpences}, isOverCategory =${category.isOverCategory} WHERE id=${category.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the category', err);
    }
}

async function updateTotalExpences(totalExpences){
    let okPacket;
    const query = `UPDATE category SET totalExpences= ${category.totalExpences} WHERE id=${category.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the category', err);
    }
}

async function removeCategory(categoryId, ) {
    let query = `DELETE FROM category WHERE category.id = ${categoryId} `;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

//internal use functions:

