/**
 * Authcode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "SSOAuthCode",
  attributes: {

      code: {
          type: 'string'
      },
      userId: {
          type: 'string',
          required: true
      },
      clientId: {
          type: 'string',
          required: true
      },
      redirectURI: {
          type: 'string',
          required: true
      }

  },

  beforeCreate: function (values, next) {
      values.code = UtilsService.uid(16);
      next();
  }
};

