/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "SSOUserIndex",
  attributes: {
    ten: {
      type: 'string'

    },
    shtk: {
      type: 'string'
    },
    sodksh: {
      type: 'string'
    },
    ngaycap: {
      type: 'string'
    },
    noicap: {
      type: 'string'
    },
    diengiai: {
      type: 'string'
    },
    trangthai: {
      type: 'string'
    },
    toJSON: function () {
      var obj = this.toObject();

      return obj;
    }



  }
};
