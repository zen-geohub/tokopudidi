'use strict';
const bcryptjs = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'UserId' })
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required!'
        },
        notNull: {
          msg: 'Username is required!'
        },
        len: {
          args: [3, 255],
          msg: 'Username must be at least 3 characters long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        notNull: {
          msg: 'Email is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        notNull: {
          msg: 'Password is required!'
        },
        len: {
          args: [5, 255],
          msg: 'Password must be at least 5 characters long'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((input, option) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(input['password'], salt);

    input['password'] = hash;
    input['role'] = 'Buyer';
  })

  return User;
};