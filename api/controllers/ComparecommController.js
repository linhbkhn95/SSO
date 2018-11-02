/**
 * ComparecommController
 *
 * @description :: Server-side logic for managing comparecomms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'getAll':function(req,res,next){
	 //Authorize.count({ten:"Tùng"}).exec(function foundAuthorize(err,length){
	//  Model.find({ where: { name: 'foo' }, limit: 10, skip: 10 });
		CompareComm.count(function foundAuthorize(err,length){
			 if(err) return next(err);

			 console.log(  ' CompareComm.count(function foundAuthorize(err,length){ ở bên Oauth2');
			 var pagesize = req.body.pagesize;
			 console.log(req.body.pagesize);
			 var numOfPages= Math.ceil(length/pagesize);
					console.log(numOfPages);
			 var start = (req.body.page-1)*pagesize;

			 CompareComm.find({ limit: start+pagesize, skip: start },function foundAuthorize(err,rs){
					//console.log(rs);
					res.send({data:rs,numOfPages:numOfPages});
		 })

		 });
			// Paging.fetchDataList(req.body.page,req.body.pagesize,list,function(data){
			//
			//        res.send(data);
			//
			// });

	}
};
