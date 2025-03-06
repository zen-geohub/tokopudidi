const express = require('express')
const router = express.Router()
const Products = require('../controllers/products')
const Cart = require('../controllers/cart')

// product
router.get('/products', Products.readProductsByUser)
router.get('/products/:id', Products.detailProductByUser)

// cart
router.get('/cart', Cart.readCart)
router.get('/cart/increment/:id', Cart.incrementProduct)
router.get('/cart/decrement/:id', Cart.decrementProduct)
router.get('/cart/add/:id', Cart.addCart)
router.get('/cart/delete/:id', Cart.deleteCart)

module.exports = router