'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let categories = require('../data/categories.json').map((el) => {
      delete el.id
      return el
    })

    let products = require('../data/products.json').map((el) => {
      delete el.id
      return el
    })

    await queryInterface.bulkInsert("Categories", categories)
    await queryInterface.bulkInsert("Products", products)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null)
    await queryInterface.bulkDelete("Categories", null)
  }
};
