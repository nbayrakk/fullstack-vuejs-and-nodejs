const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Database connection success")
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports = connectDataBase