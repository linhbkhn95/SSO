/**
 * AuthcodeController
 *
 * @description :: Server-side logic for managing authcodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getall:function(req,res){
        console.log('getall')
        Authcode.find().exec((err,list)=>{
            return res.send(list);
        })
    },
    reset:function(req,res){
        Authcode.destroy().exec((err,list)=>{
            return res.send(list);
    
        })
    }
};

