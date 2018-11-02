/**
 * Buyindex.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "SSOBuyIndex",
  attributes: {
    shtk: {
      type: 'string'
    },
    maccq: {
      type: 'string'
    },
    muachove: {
      type: 'string'
    },
    banchora: {
      type: 'string'
    },
    tong: {
      type: 'string'
    },
    khadung: {
      type: 'string'
    }
  }
};
