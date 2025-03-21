const { Product, Category } = require('../models')
const rupiah = require('../helpers/formatRupiah')
const timeSince = require('../helpers/published')
const { where, Op } = require('sequelize')

class Products {
    static async readProducts(req, res) {
        try {
            let { deleted } = req.query
            let { filter, name } = req.query
            let option = {
                include: Category,
                where: {
                    stock: {
                        [Op.gt]: 0
                    },
                }
            }

            if (name && filter) {
                option.where = {
                    CategoryId: filter,
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            } else if (name) {
                option.where = {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            } else if (filter) {
                option.where = {
                    CategoryId: filter
                }
            }

            let categories = await Category.findAll()
            let products = await Product.findAll(option)
            res.render("admin/products/listProduct", { products, rupiah, deleted, categories })
        } catch (err) {

            res.send(err)
        }
    }

    static async detailProduct(req, res) {
        try {
            let { id } = req.params
            let data = await Product.findProductById(id)
            
            res.render('admin/products/detailProduct', { data, rupiah, timeSince })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formAddProduct(req, res) {
        try {
            let { path, msg } = req.query
            let data = await Category.findAll()
            res.render('admin/products/formAddProduct', { data, path, msg })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddProduct(req, res) {
        try {
            if (req.file) {
                req.body['image'] = `/public/${req.file['filename']}`
            }

            await Product.create(req.body)
            res.redirect('/admin/products')
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let msg = error.errors.map(el => el.message)
                let path = error.errors.map(el => el.path)

                res.redirect(`/admin/products/add?msg=${msg}&path=${path}`)
            } else {
                console.log(error)
                res.send(error)
            }
        }
    }

    static async formEditProduct(req, res) {
        try {
            let { path, msg } = req.query
            let { id } = req.params
            let categories = await Category.findAll()
            let product = await Product.findByPk(id)
            res.render('admin/products/formEditProduct', { categories, product, path, msg })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProduct(req, res) {
        let { id } = req.params
        try {
            await Product.update(
                req.body,
                {
                    where: {
                        id
                    }
                }
            )

            res.redirect("/admin/products")
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let msg = error.errors.map(el => el.message)
                let path = error.errors.map(el => el.path)

                res.redirect(`/admin/products/edit/${id}?msg=${msg}&path=${path}`)
            } else {
                res.send(error)
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            let { id } = req.params
            let product = await Product.findByPk(id)
            await Product.destroy({
                where: {
                    id: id
                }
            })
            res.redirect(`/admin/products?deleted=${product.name}`)
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async readProductEmpety(req, res) {
        try {
            let option = {
                include: Category,
                where: {
                    stock: {
                        [Op.eq]: 0
                    }
                }
            }
            let products = await Product.findAll(option)
            res.render("admin/products/listProductEmpety", { products, rupiah })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async readProductsByUser(req, res) {
        try {
            let { filter, name } = req.query
            let option = {
                include: Category,
                where: {
                    stock: {
                        [Op.gt]: 0
                    },
                }
            }

            if (name && filter) {
                option.where = {
                    CategoryId: filter,
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            } else if (name) {
                option.where = {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            } else if (filter) {
                option.where = {
                    CategoryId: filter
                }
            }

            let categories = await Category.findAll()
            let products = await Product.findAll(option)
            res.render("user/products/listProduct", { products, rupiah, categories })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async detailProductByUser(req, res) {
        try {
            let { id } = req.params
            let data = await Product.findByPk(id)
            res.render('user/products/detailProduct', { data, rupiah, timeSince })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async buyProduct(req, res) {
        try {
            const { id } = req.params
            await Product.increment({ stock: -1 }, { where: { id: +id } })
            res.redirect('/user/products')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Products