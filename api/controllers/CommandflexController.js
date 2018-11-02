/**
 * CommandflexController
 *
 * @description :: Server-side logic for managing Commandflexes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'add':function(req,res){
        // var {ten,socmtnd,ngaycap,noicap,ngaHieuLuc,ngayHetHieuLuc,phamviUyQuyen} = req.body;
        // var data=req.body.data;
        // console.log('vao add');
        //  console.log(req.body);
        //  Commandflex.create(req.body,function Commandflex(err,au){
        //   if(err){

        //     res.send(401,"lỗi thêm Commandflex");
        //     console.log(err);
        //    //return  res.send(err)
        //   }

          let data={
              EEC:0,
              status:"ok"
          };
          
          return res.send(data);

        // });
  },
};

