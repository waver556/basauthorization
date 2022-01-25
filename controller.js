const User = require('./models/User')


class controller {
    async registration(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Уже существует'})
            }

            const user = new User({username, password})
            await user.save()
            return res.json({message: "ok"})

        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username}, {password}) // добавил password , если что убрать

            if (!user) {
                return  res.status(400).json({message: 'no no no'})
            }
            return res.json({message: 'success'})

        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Registration error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }


}
module.exports = new controller()