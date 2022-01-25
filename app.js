const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const bodyParser = require('body-parser')
const User = require('./models/User')
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use("/auth", authRouter)
app.use('/', express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username, password }).lean()

    if (!user) {
        return res.json({status: 'error', error: 'Ты ввел неверные данные'})
    }

    res.json({status: 'Ты ввел правильные данные', message : 'Иди нахуй'})
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://newnew:newpassword@cluster0.sixke.mongodb.net/newnew?retryWrites=true&w=majority`)




        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}

start()