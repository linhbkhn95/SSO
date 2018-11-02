/**
 * BuyindexController
 *
 * @description :: Server-side logic for managing buyindices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
			'getList' : function(req,res,next){
				console.log(req.body.shtk);
				UserIndex.findOne({shtk:req.body.shtk}).exec(function (err, ui) {
					 if(err) return next(err);
					 if(!ui) return next();

					 return res.send(ui);

				});
		 },
};
