const categoryService = require('./category.service');
const logger = require('../../services/logger.service');


module.exports={
    getCategories,
    getCategoryById,
    addCategory,
    removeCategory,
    updateCategory
}

async function getCategories(req, res){
    const categorys = await categoryService.query(req.query);
    logger.debug(categorys);
    res.send(categorys);
}

async function getCategoryById(req, res){
    const category = await categoryService.getById(req.params.id, req.query);
    logger.debug(category);
    res.send(category);
}

async function addCategory(req,res){
    const category = req.body
    await categoryService.addCategory(category);
    res.end();
}

async function updateCategory(req, res){
    const categoryId= req.params.id;
    const category = req.body;
    if(category.id !== categoryId) return;
    let updateStat = await categoryService.updateCategory(category);
    (updateStat.affectedRows !== 0)? res.send(category): res.send(updateStat);
}

async function removeCategory(req, res){
    await categoryService.removeCategory(req.params.id);
    res.end();
}


