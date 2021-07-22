const userService = require('./user.service')
const logger = require('../../services/logger.service')


async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const user = req.body;
    let updateStat = await userService.update(userId, user)
    res.send(updateStat, user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}