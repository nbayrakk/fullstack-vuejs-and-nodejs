const bcrypt = require('bcrypt')

const validateUserInput = (email, password) => {
    return email && password
}
const validateUserInputRegister = (email, password,name) => {
    return email && password && name
}
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password,hashedPassword)
}

module.exports = {
    validateUserInput,
    comparePassword,
    validateUserInputRegister
}
