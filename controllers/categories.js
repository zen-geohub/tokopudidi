const { where } = require('sequelize')
const { Category } = require('../models')

class Categories {
    static async readCategories(req, res) {
        try{
            let { deleted } = req.query
            let { updated } = req.query
            let data = await Category.findAll()
            res.render('admin/categories/listCategories', { data, deleted, updated })
        }catch(err) {
            console.log(err)
            res.render(err)
        }
    }

    static async formAddCategory(req, res) {
        try{
            let { errors } = req.query
            res.render('admin/categories/formAddCategory', { errors })
        }catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCategory(req, res) {
        try{
            console.log(req.body)
            await Category.create(req.body)
            res.redirect('/admin/categories')
        }catch(err) {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                res.redirect(`/admin/categories/add?errors=${err}`)
            } else {
                res.send(err)
            }
        }
    }

    static async formEditCategory(req, res) {
        try{
            let { errors } = req.query
            let { id } = req.params
            let data = await Category.findByPk(id)
            res.render('admin/categories/formEditCategory', { data, errors })
        }catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editCategory(req, res) {
        let { id } = req.params
        try{
            await Category.update(
                req.body,
                {
                    where: {
                        id
                    }
                }
            )

            let data = await Category.findByPk(id)

            res.redirect(`/admin/categories?updated=${data.name}`)
        }catch(err) {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                res.redirect(`/admin/categories/edit/${id}?errors=${err}`)
            } else {
                res.send(err)
            }
        }
    }

    static async deleteCategory(req, res) {
        try{
            let { id } = req.params
            let data = await Category.findByPk(id)
            await Category.destroy({
                where: {
                    id
                }
            })

            res.redirect(`/admin/categories?deleted=${data.name}`)
        }catch(err) {
            console.log(err)
            res.send(err)
        }
    }
}

module.exports = Categories