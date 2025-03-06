const { Op } = require('sequelize');
const { UserProduct, Product, Profile } = require('../models');
const rupiah = require('../helpers/formatRupiah');

async function cartMiddleware(req, res, next) {
  try {
    if (!req.session['UserId']) {
      res.locals['cart'] = { totalItems: 0, totalPrice: 0 };
      res.locals['profile'] = {};
      return next();
    }

    const profile = await Profile.findOne({
      where: {
        UserId: req.session['UserId'],
      },
      attributes: ['imageUrl']
    });

    const cartData = await UserProduct.findAll({
      where: {
        UserId: req.session['UserId'],
        quantity: { [Op.gt]: 0 }
      },
      include: Product,
      attributes: ['ProductId', 'quantity']
    });

    const totalItems = cartData.reduce((a, b) => a + b['quantity'], 0);
    const totalPrice = rupiah(cartData.reduce((a, b) => a + b['quantity'] * b['Product']['price'], 0));

    res.locals['cart'] = { totalItems, totalPrice };
    res.locals['profile'] = profile;
    next();
  } catch (error) {
    res.locals['cart'] = { totalItems: 0, totalPrice: 0 };
    res.locals['profile'] = {};
    next();
  }
}

module.exports = cartMiddleware;