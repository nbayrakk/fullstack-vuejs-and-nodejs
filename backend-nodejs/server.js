const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers/index')
const customErrorHandler = require('./middlewares/errors/customErrorHandler')
const connectDatabase = require('./helpers/database/connectDatabase');
const cors = require('cors');

const app = express();

//Enviroment Variables 
dotenv.config({
    path:'./config/env/config.env'
}) 
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions))

//Database connect
connectDatabase();
app.use(express.json())
const PORT =process.env.PORT

//Routers Middleware

app.use('/api',routers);

app.get('/',(req,res) => {
    res.send("App Started!")
})

// Error Handler
app.use(customErrorHandler)


app.listen(PORT,()=> {
    console.log(`Server run this port:${PORT} `)
})