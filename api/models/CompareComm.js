/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "SSOCompareComm",
  attributes: {

    shtk: {
      type: 'string'

    },
    mccq: {
      type: 'string'
    },
    loailenh: {
      type: 'string'
    },
    giatrilenh: {
      type: 'string'
    },
    sotiennop: {
      type: 'string'
    },
    diengiai: {
      type: 'string'
    },
    sochungtu: {
      type: 'string'
    },
    sotiendenghi: {
      type: 'string'

    },
    trangthai: {
      type: 'string'
    },
    sotienthua: {
      type: 'string'
    },
    sotienthieu: {
      type: 'string'
    },

    toJSON: function () {
      var obj = this.toObject();

      return obj;
    }



  }
};
