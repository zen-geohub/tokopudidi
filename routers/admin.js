const express = require('express')
const router = express.Router()
const Products = require('../controllers/products')
const Category = require('../controllers/categories')

// products
router.get('/products', Products.readProducts)
router.get('/products/:id', Products.detailProduct)
router.get('/products/add', Products.formAddProduct)
router.post('/products/add', Products.postAddProduct)
router.get('/products/edit/:id', Products.formEditProduct)
router.post('/products/edit/:id', Products.editProduct)
router.get('/products/delete/:id', Products.deleteProduct)

// categories
router.get('/categories', Category.readCategories)
router.get('/categories/add', Category.formAddCategory)
router.post('/categories/add', Category.postAddCategory)
router.get('/categories/edit/:id', Category.formEditCategory)
router.post('/categories/edit/:id', Category.editCategory)
router.get('/categories/delete/:id', Category.deleteCategory)

module.exports = router