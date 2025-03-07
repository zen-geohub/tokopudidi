const express = require('express')
const router = express.Router()
const Products = require('../controllers/products')
const Cart = require('../controllers/cart')
const UserProfile = require('../controllers/profiles')
const upload = require('../middlewares/multer')

// product
router.get('/products', Products.readProductsByUser)
router.get('/products/:id', Products.detailProductByUser)
router.get('/products/buy/:id', Products.buyProduct)

// cart
router.get('/cart', Cart.readCart)
router.get('/cart/increment/:id', Cart.incrementProduct)
router.get('/cart/decrement/:id', Cart.decrementProduct)
router.get('/cart/add/:id', Cart.addCart)
router.get('/cart/delete/:id', Cart.deleteCart)

// profile
router.get('/profile', UserProfile.readProfile);
router.get('/profile/register/', UserProfile.showCreateProfile);
router.post('/profile/register/', upload.single('imageUrl'), UserProfile.createProfile);
router.get('/profile/update/', UserProfile.showUpdateProfile);
router.post('/profile/update/', upload.single('imageUrl'), UserProfile.updateProfile);

module.exports = router