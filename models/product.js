'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" })
      Product.hasMany(models.UserProduct, { foreignKey: "ProductId" })
    }

    static async findProductById(id) {
      try {
        const data = await Product.findByPk(id)

        return data
      } catch (error) {
        throw error
      }
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name product is required"
        },
        notEmpty: {
          msg: "name product is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required"
        },
        notEmpty: {
          msg: "description is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price is required"
        },
        notEmpty: {
          msg: "price is required"
        },
        min: {
          args: [1000],
          msg: "price must be at least 1000"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "image is required"
        },
        notEmpty: {
          msg: "image is required"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock is required"
        },
        notEmpty: {
          msg: "stock is required"
        },
        min: {
          args: [0],
          msg: "stock must be at least 0"
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};