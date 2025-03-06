const { UserProduct, Product, User } = require('../models')
const rupiah = require('../helpers/formatRupiah')
const { Op } = require('sequelize')

class Cart {
    static async readCart(req, res) {
        try {
            const UserId = req.session['UserId']
            const data = await UserProduct.findAll({
                where: {
                    UserId: UserId,
                    quantity: {
                        [Op.gt]: 0
                    }
                },
                include: Product,
                attributes: ['UserId', 'ProductId', 'quantity', 'status'],
                order: [['ProductId', 'asc']]
            })

            res.render('user/cart/cart', { data, rupiah })
        } catch (err) {
            res.send(err)
        }
    }

    static async addCart(req, res) {
        try {
            const { id } = req.params;
            const userId = req.session['UserId']

            const userCart = await UserProduct.findOne({ where: { ProductId: +id, UserId: +userId } })

            if (userCart) {
                UserProduct.increment({ quantity: 1 }, { where: { ProductId: +id, UserId: +userId } })
            } else {
                UserProduct.create({
                    ProductId: +id,
                    UserId: +userId,
                    quantity: 1,
                    status: 'Payment'
                })
            }

            res.redirect('/user/products')
        } catch (err) {
            res.send(err)
        }
    }

    static async incrementProduct(req, res) {
        try {
            const { id } = req.params

            const product = await Product.findOne({ where: { id: +id } })
            const userProduct = await UserProduct.findOne({ where: { ProductId: +id } })

            if (userProduct['quantity'] + 1 <= product['stock']) {
                await UserProduct.increment({ quantity: 1 }, { where: { ProductId: +id } })
            }
            res.redirect('/user/cart')
        } catch (error) {
            res.send(error)
        }
    }

    static async decrementProduct(req, res) {
        try {
            const { id } = req.params

            await UserProduct.increment({ quantity: -1 }, { where: { ProductId: +id } })
            res.redirect('/user/cart')
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteCart(req, res) {
        try {
            const { id } = req.params
            const userCartItems = await UserProduct.findAll({ where: { UserId: +id } })

            for (const item of userCartItems) {
                await Product.increment({ stock: -item['quantity'] }, { where: { id: item['ProductId'] } });
            }

            await UserProduct.update({ quantity: 0, status: 'Paid' }, { where: { UserId: +id } })
            res.redirect('/user/cart')
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = Cart