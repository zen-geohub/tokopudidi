const express = require('express')
const router = express.Router()
const Products = require('../controllers/products')
const Category = require('../controllers/categories')
const Categories = require('../controllers/categories')

// products
router.get('/products', Products.readProducts)
router.get('/products/add', Products.formAddProduct)
router.post('/products/add', Products.postAddProduct)
router.get('/products/empety', Products.readProductEmpety)
router.get('/products/:id', Products.detailProduct)
router.get('/products/edit/:id', Products.formEditProduct)
router.post('/products/edit/:id', Products.editProduct)
router.get('/products/delete/:id', Products.deleteProduct)

// categories
router.get('/categories', Categories.readCategories)
router.get('/categories/add', Categories.formAddCategory)
router.post('/categories/add', Categories.postAddCategory)
router.get('/categories/edit/:id', Categories.formEditCategory)
router.post('/categories/edit/:id', Categories.editCategory)
router.get('/categories/delete/:id', Categories.deleteCategory)

module.exports = router