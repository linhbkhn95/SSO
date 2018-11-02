module.exports = {

          'update':function(data){
                // var {ten,socmtnd,ngaycap,noicap,ngaHieuLuc,ngayHetHieuLuc,phamviUyQuyen} = req.body;

                Authorize.update({cmtnd:data.cmtnd},data, function AuthorizeUpdated(err) {
              //  Authorize.update({cmtnd:data.cmtnd},data).exec(function afterwards(err){
                   if (err) {
            				 console.log(err);

                  //   return res.send(err);
                   }


                 });

            },
            'add':function(data){
                  // var {ten,socmtnd,ngaycap,noicap,ngaHieuLuc,ngayHetHieuLuc,phamviUyQuyen} = req.body;
                  // var data=req.body.data;
                   console.log(data);
                   Authorize.create(data,function Authorize(err,au){
                    if(err){


                      console.log(err);
                     //return  res.send(err)
                    }

                  });
            },
          'accessAddUpdate':function(req,res,next){
                var {textBtn,data} = req.body;
                console.log(data);
              try{
                  if(textBtn==="Thêm mới"){
                     this.add(data);
                  }
                  else{
                    this.update(data);
                  }
                  return res.send("ok");
              }catch(e){
                console.log(e);
                return res.send("fail");
              }

          },
          // ,{select: ['trangthai']}
          'getAllStatus':function(req,res){
            //    console.log('vao getAllStatus');

                // Userindex.query('SELECT trangthai FROM userindex GROUP BY trangthai', function(err,data){
                //  Userindex.groupBy('trangthai').find().exec(function(err,data){
                //    if(err)
                //       res.send(err);
                //
                //     console.log(data);
                //     res.send(data);
                // })
                var data =[
                      {trangthai:""},
                      {trangthai:"Mở"},
                      {trangthai:"Đóng"},
                      {trangthai:"Khóa"}
                ]
                res.send(data);
          },
          'search':function(req,res,next){
            // {where:{ like:{shtk:'%'+req.body.shtk+'%'},
            //          like:{sodksh:'%'+req.body.sodksh+'%'},
            //          like:{trangthai:'%'+req.body.sl+'%'}
            //   }

            var sortSearch = req.body.sortSearch;
            console.log(sortSearch);
            var dataSort='';
            //generate chuoi sort
            if(sortSearch!=undefined&&sortSearch.length>0){

                  if(sortSearch[0].desc==='false'){
                     dataSort = sortSearch[0].id+" DESC";
                  }
                  else{
                     dataSort = sortSearch[0].id+" ASC";
                  }

            }

            console.log('vao userindex/search');
            var dataSearch=req.body.keySearch;

            var likeSearch={};
            //generate ra chuoi like search
            if(dataSearch!=undefined&&dataSearch.length>0){
                dataSearch.forEach(function(item){

                   likeSearch[item.id]='%'+item.value+'%';
                })
            }


            Userindex.count({like:likeSearch}).exec(function found(err,length){
               if(err) return next(err);
               console.log(length);


                   var pagesize = parseInt(req.body.pagesize);
                   var numOfPages= Math.ceil(length/pagesize);
                   var start = parseInt((req.body.page-1)*pagesize);
                   var keySearch={};
                   if(dataSort===''){
                          keySearch= {where:{like:likeSearch}};
                         console.log(keySearch);
                   }
                   else{
                        keySearch= {where:{like:likeSearch,sort:dataSort}};
                        console.log(keySearch);
                   }
                   Userindex.find(keySearch).paginate({ limit:pagesize, page: req.body.page }).exec(function foundAuthorize(err,rs){
                  //    console.log(rs);
                      res.send({data:rs,numPerPage:numOfPages});
                 })

                 });
           },

          'get' : function(req,res,next){
            console.log(req.body.shtk);
       		  Userindex.findOne({shtk:req.body.shtk}).exec(function (err, ui) {
       				 if(err) return next(err);
       				 if(!ui) return next();
               Buyindex.find({where: { shtk: ui.shtk }},function(err,rs){
                     res.send({
                        infAccount:ui,
                        listMoney:rs
                     })
               })
       				 //return res.send(ui);

       			});
       	 },
          destroy: function(req, res, next) {

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
            Userindex.count(function found(err,length){
               if(err) return next(err);
               console.log(length);
               var pagesize = parseInt(req.body.pagesize);
               var numOfPages= Math.ceil(length/pagesize);
               var start = parseInt((req.body.page-1)*pagesize);
              //  console.log('pagesize ' +pagesize);
              //  console.log('numOfPages '+numOfPages);
              //  console.log(start);
               var limit = start+pagesize;
            //   console.log(limit);
                 console.log(  ' Userindex.count(function foundAuthorize(err,length){ ở bên Oauth2');
               Userindex.find().paginate({ limit:pagesize, page: req.body.page }).exec(function(err,rs){
                  console.log(rs);
                  res.send({data:rs,numPerPage:numOfPages});
             })

             });
              // Paging.fetchDataList(req.body.page,req.body.pagesize,list,function(data){
              //
              //        res.send(data);
              //
              // });

          }
}
