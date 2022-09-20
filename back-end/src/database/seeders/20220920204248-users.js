// const md5 = require('md5');
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Delivery App Admin',
        role: 'administrator',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        // senha: md5('--adm2@21!!--')
      },
      {
        name: 'Fulana Pereira',
        role: 'seller',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        // senha: md5('fulana@123')
      },
      {
        name: 'Cliente Zé Birita',
        role: 'customer',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        // senha: md5('$#zebirita#$')
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
