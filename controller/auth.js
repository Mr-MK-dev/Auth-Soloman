const User = require('../models/user')
const bcrypt = require('bcrypt')
// const missDataChecking = () => {
//     if (!this.username || !this.password) {
//         return res.status(400).json('Your are fucking idiot 😒 Complete Your fucking data')
//     }
// }

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body
        if (!username || !password) {
            return res.status(400).json('Your are fucking idiot 😒 Complete Your fucking data')
        }


        if (password.length < 6) {
            return res.status(400).json('Password is very short');
        }
        const newPassword = await bcrypt.hash(password, 10)

        const addUser = await User.create({
            username,
            password: newPassword,
            role

        })
        res.status(200).json(
            {
                status: 'success',
                data: addUser

            }
        )
    }
    catch (err) {
        res.status(401).json(
            {
                status: 'fail',
                msg:
                    err.message
            }
        )

    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username && !password) {
            return res.status(400).json('Your are fucking idiot 😒 Complete Your fucking data')
        }
        const user = await User.findOne({ username })

        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                status: 'success',
                body: "Loged in"
            })
        } else {
            return res.status(401).json('Fake user')
        }
    } catch (err) {
        res.status(401).json(
            {
                status: 'fail',
                msg:
                    err.message
            }
        )
    }
}

exports.update = async (req, res) => {
    try {
        const { role, id } = req.body
        if (role && id) {
            await User.findById(id)
                .then((user) => {
                    if (user.role !== 'admin') {
                        res.json(
                            { send: 'You are not admin' }
                        )
                    } else {
                        user.role = role
                        user.save()
                        res.status(201).json({
                            status: 'success',
                            newdata: user
                        })
                    }
                }
                )
        } else {
            res.status(401).json(
                {
                    status: 'fail',
                    notdadmin: "You\'re not admin😃"
                }
            )
        }
    } catch (err) {
        res.status(401).json(
            {
                status: 'fail',
                msg:
                    err.message
            }
        )
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const theId = req.params.id
        console.log(theId);
        delUser = await User.findByIdAndDelete(theId)
        res.status(201).json({
            status: 'success',
            data: 'User deleted',
            theId: delUser
        })
    } catch (err) {
        res.status(401).json(
            {
                status: 'fail',
                msg:
                    err.message
            }
        )
    }
}

