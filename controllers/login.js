const { User, Profile } = require('../models');
const bcryptjs = require('bcryptjs');

class Login {
    static async loginPage(req, res) {
        try {
            const { error } = req.query

            res.render('login/login', { error })
        } catch (err) {
            res.send(err)
        }
    }

    static async postLogin(req, res) {
        try {
            const { userName, password } = req.body

            const user = await User.findOne({ where: { userName: userName } })

            if (!user) {
                return res.redirect(`/login?error=Invalid username`)
            }

            const isValidPassword = bcryptjs.compareSync(password, user['password'])
            if (isValidPassword) {
                req.session['UserId'] = user['id'];
                req.session['role'] = user['role'];

                user['role'] === 'Buyer' ? res.redirect('/user/products') : res.redirect('/admin/products') 
            } else {
                return res.redirect(`/login?error=Invalid password`)
            }
        } catch (err) {
            res.send(err)
        }
    }

    static async registerPage(req, res) {
        try {
            const { path, msg } = req.query;

            res.render('login/register', { path, msg });
        } catch (err) {
            res.send(err)
        }
    }

    static async postRegister(req, res) {
        try {
            await User.create(req.body);
            res.redirect(`/profile/register/${req.body['userName']}`);
        } catch (err) {
            if (err['name'] === 'SequelizeValidationError' || err['name'] === 'SequelizeUniqueConstraintError') {
                const msg = err['errors'].map(el => el['message']);
                const path = err['errors'].map(el => el['path']);

                res.redirect(`/register?msg=${msg}&path=${path}`)
            } else {
                res.send(err)
            }
        }
    }

    static async showCreateProfile(req, res) {
        try {
            const { path, msg } = req.query;
            const { userName } = req.params;

            const user = await User.findOne({ where: { userName: userName } });

            res.render('profile/registerProfile', { user, path, msg })
        } catch (error) {
            res.send(error)
        }
    }

    static async createProfile(req, res) {
        try {
            const { userName } = req.params
            const user = await User.findOne({ where: { userName: userName } })
            req.body['UserId'] = user['id']

            await Profile.create(req.body)
            res.redirect('/login')
        } catch (error) {
            if (err['name'] === 'SequelizeValidationError' || err['name'] === 'SequelizeUniqueConstraintError') {
                const msg = err['errors'].map(el => el['message']);
                const path = err['errors'].map(el => el['path']);

                res.redirect(`/register?msg=${msg}&path=${path}`)
            } else {
                res.send(err)
            }
        }
    }

    static logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/login')
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Login