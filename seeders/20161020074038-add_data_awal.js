'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@ken.com',
      password: 'admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'supervisor',
      email: 'supervisor@ken.com',
      password: 'supervisor',
      role: 'supervisor',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'customer',
      email: 'customer@ken.com',
      password: 'customer',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null);
  }
};
