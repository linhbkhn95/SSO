


module.exports = {
  tableName: "SSOAuthorize",
  attributes: {
    ten: {
      type: 'string'
    },
    cmtnd: {
      type: 'string'
    },
    ngaycap: {
      type: 'string'
    },
    noicap: {
      type: 'string'
    },
    diachi: {
      type: 'string'
    },
    ngayHieuLuc: {
      type: 'string'
    },
    ngayHetHieuLuc: {
      type: 'string'
    },
    phamviUyQuyen: {
      type: 'string'
    },
    toJSON: function () {
      var obj = this.toObject();

      return obj;
    }
  }

};
