const express = require('express')
const router = express.Router()
const Products = require('../controllers/products')
const Cart = require('../controllers/cart')

// product
router.get('/products', Products.readProducts)
router.get('/products/:id', Products.detailProduct)

// cart
router.get('/cart', Cart.readCart)
router.post('/cart/add/:id', Cart.addCart)
router.get('/cart/delete/:id', Cart.deleteCart)

//history
router.get('/orders', Cart.readHistory)

module.exports = router