import React from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {search,updateNumberPage,updateKeySearch} from 'actionCloseAccount';
var FormCloseAcount   =React.createClass({


      getInitialState(){
        return {
          sHTK: '',
          soDKSH: ''
        }
      },


      search(){
        console.log('search');
        var {dispatch} = this.props;
        var shtk =this.refs.shtk.value;
        var dksh = this.refs.dksh.value;
         var sl  =   this.refs.sl.value;
        var keySearch={and:[
                           {like:{shtk:'%'+shtk+'%'}},
                          {like:{sodksh:'%'+dksh+'%'}},
                          {like:{trangthai:'%'+sl+'%'}}
                        ]
                      }
         io.socket.get('/userindex/search',{
            shtk :this.refs.shtk.value,
           dksh : this.refs.dksh.value,
           sl  :   this.refs.sl.value,
          page:this.props.page,pagesize:this.props.pagesize
        },function(resData, jwres){
          console.log(resData);
           dispatch(search(resData.data));
           dispatch(updateKeySearch(keySearch,"search"));
           dispatch(updateNumberPage(resData.numPerPage));

        })
        // axios.post('user/search',{shtk:shtk,dksh:dksh,sl:sl})
        //   .then(res => {
        //      dispatch(search(res.data));
        //      console.log(res.data)
        //    })
        //   .catch(err => console.log(err));

      },
      changeHandler(e){
        console.log(e);
        this.setState({ sHTK : e.target.value });
      },
      changeHand(e){

        this.setState({ soDKSH : e.target.value });
      },
    render(){
       return(
         <div className="form-group row">
             <div className="col-xs-2">
               <label>Số hiệu TKGD</label>
               <input className="form-control"   ref="shtk" type="text"/>
             </div>
             <div className="col-xs-2">
               <label >Số ĐKSH</label>
               <input className="form-control"  ref="dksh" type="text"/>
             </div>

             <div className="col-xs-6">
               <label >Trạng thái</label>
               <div>
                 <div className="col-xs-7">
                 <select ref="sl" className="form-control">
                    <option></option>
                   <option>All</option>
                   <option>Pending</option>
                   <option>Ready</option>
                 </select>
                 </div>
                 <input type="button" onClick={this.search} className="btn btn-primary col-xs-3" value="Search" />
               </div>


             </div>
         </div>
       )
   }
 });
 module.exports = connect(function (state){
   return {
          page:state.closeAccount.page,
          pagesize:state.closeAccount.pagesize,
          typeSearch:state.closeAccount.typeSearch
   };
 })(FormCloseAcount);
