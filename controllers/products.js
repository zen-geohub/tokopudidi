const { Product, Category } = require('../models')
const rupiah = require('../helpers/formatRupiah')
const timeSince = require('../helpers/published')
const { where, Op } = require('sequelize')

class Products {
    static async readProducts(req, res) {
        try {
            let { deleted } = req.query
            let option = {
                include: Category,
                where: {
                    stock: {
                        [Op.gt] : 0
                    }
                }
            }
            let products = await Product.findAll(option)
            res.render("admin/products/listProduct", { products, rupiah, deleted })
        } catch (err) {

            res.send(err)
        }
    }

    static async detailProduct(req, res) {
        try {
            let { id } = req.params
            let data = await Product.findByPk(id)
            console.log(data)
            res.render('admin/products/detailProduct', { data, rupiah, timeSince })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formAddProduct(req, res) {
        try {
            let data = await Category.findAll()
            res.render('admin/products/formAddProduct', { data })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddProduct(req, res) {
        try {
            await Product.create(req.body)
            res.redirect('/admin/products')
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formEditProduct(req, res) {
        try {
            let { id } = req.params
            let categories = await Category.findAll()
            let product = await Product.findByPk(id)
            res.render('admin/products/formEditProduct', { categories, product })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProduct(req, res) {
        try {
            let { id } = req.params
            await Product.update(
                req.body,
                {
                    where: {
                        id
                    }
                }
            )

            res.redirect("/admin/products")
        } catch (err) {
            console.log(err)
            res.render(err)
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
                        [Op.eq] : 0
                    }
                }
            }
            let products = await Product.findAll(option)
            res.render("admin/products/listProductEmpety", { products, rupiah})
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async readProductsByUser(req, res) {
        try {
            let { deleted } = req.query
            let option = {
                include: Category,
                where: {
                    stock: {
                        [Op.gt] : 0
                    }
                }
            }
            let products = await Product.findAll(option)
            res.render("user/products/listProduct", { products, rupiah})
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
}

module.exports = Products