const bcrypt = require('bcrypt')
const utilService = require('../../services/util.service')
const userService = require('../user/user.service')


const saltRounds = 10

async function login(email, password) {
    if (!email || !password) return Promise.reject('email and password are required!')
    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(fullName,  email, password) {
    if (!fullName || !password || !email) return Promise.reject('all valids are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    userService.add( fullName, email, hash)
}

module.exports = {
    signup,
    login,
}