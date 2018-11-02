

module.exports = {

          'update':function(req,res){
                // var {ten,socmtnd,ngaycap,noicap,ngaHieuLuc,ngayHetHieuLuc,phamviUyQuyen} = req.body;
                console.log('vao update');
                 console.log(req.body);
                Authorize.update({cmtnd:req.body.cmtnd},req.body, function AuthorizeUpdated(err) {
              //  Authorize.update({cmtnd:data.cmtnd},data).exec(function afterwards(err){
                   if (err) {
            				 console.log(err);
                        res.send(401,"lỗi update authorize");
                  //   return res.send(err);
                   }

                   res.send("ok");
                 });

            },
            'add':function(req,res){
                  // var {ten,socmtnd,ngaycap,noicap,ngaHieuLuc,ngayHetHieuLuc,phamviUyQuyen} = req.body;
                  // var data=req.body.data;
                  console.log('vao add');
                   console.log(req.body);
                   Authorize.create(req.body,function Authorize(err,au){
                    if(err){

                      res.send(401,"lỗi thêm authorize");
                      console.log(err);
                     //return  res.send(err)
                    }
                    res.send("ok");

                  });
            },
          'accessAddUpdate':function(req,res,next){
                var {textBtn,data} = req.body;
                console.log(data);
              try{
                  if(textBtn==="Thêm"){
                     this.add(data);
                  }
                  else{
                    this.update(data);
                  }
                  return res.send("ok");
              }catch(e){
                console.log(e);
                return res.send(401,"fail");
              }

          },
          'get' : function(req,res,next){
            console.log('lay data '+req.body.cmtnd);

       		  Authorize.findOne({cmtnd:req.body.cmtnd}).exec(function (err, au) {
       				 if(err) return next(err);
       				 if(!au) return next();

       				 return res.send(au);

       			});
       	 },
          destroy: function(req, res, next) {
              console.log('vao destroy');
              console.log(req.body);
      		 Authorize.findOne({cmtnd:req.body.cmtnd}, function foundAuthorize(err, au) {
      			 if (err) return next(err);

      			 if (!au) return next('User doesn\'t exist.');

      			 Authorize.destroy({cmtnd:req.body.cmtnd}, function auDestroyed(err) {
      				 if (err) return next(err);

      				//  // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
      				//  User.publishUpdate(user.id, {
      				// 	 name: user.name,
      				// 	 action: ' has been destroyed.'
      				//  });
      				 //
      				//  // Let other sockets know that the user instance was destroyed.
      				//  User.publishDestroy(user.id);

      			 });

      			 res.send("ok");

      		 });
      	 },
          'getAll':function(req,res,next){
           //Authorize.count({ten:"Tùng"}).exec(function foundAuthorize(err,length){
          //  Model.find({ where: { name: 'foo' }, limit: 10, skip: 10 });
            Authorize.count(function foundAuthorize(err,length){
               if(err) return next(err);

               console.log(  ' Authorize.count(function foundAuthorize(err,length){ ở bên Oauth2');
               var pagesize = req.body.pagesize;
               console.log(req.body.pagesize);
               var numOfPages= Math.ceil(length/pagesize);
                  console.log(numOfPages);
               var start = (req.body.page-1)*pagesize;

               Authorize.find().paginate({ limit: pagesize,page:req.body.page }).exec(function(err,rs){
                  console.log(rs);
                  res.send({data:rs,numOfPages:numOfPages});
             })

             });
              // Paging.fetchDataList(req.body.page,req.body.pagesize,list,function(data){
              //
              //        res.send(data);
              //
              // });

          }
}
