const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


//Import Route
const authRoutes = require('./routes/authRoute')

const app = express();

///Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')


//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware)
app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

const PORT = process.env.PORT || 8087
mongoose.connect('mongodb+srv://projecttest:projecttest@cluster0-qicvi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database Connected')
    app.listen(PORT, () => {
        console.log(`Server is Running On PORT ${PORT}`)
    })
})

.catch(err => {
    return console.log(err)
})


