 import React from 'react';
 import {connect} from 'react-redux';
 class FormModal extends React.Component{
     renderInfAccount(){
         if(this.props.infAccount!=null){
            return(
              <div className="form-group row">
                <div className="col-xs-3">
                  <label>Số hiệu TKGD</label>
                  <input className="form-control" value={this.props.infAccount.shtk} type="text" readOnly/>
                </div>
                <div className="col-xs-4">
                  <label >Tên khách hàng</label>
                  <input className="form-control" value={this.props.infAccount.ten} type="text" readOnly/>
                </div>
                <div className="col-xs-4">
                  <label >Số ĐKSH</label>
                  <input className="form-control" value={this.props.infAccount.sodksh} type="text" readOnly/>
                </div>

              </div>
            )
         }
     }

     render(){
          return(
             <div>
              {this.renderInfAccount()}
              <div className="form-group row">
                <div className="col-xs-4">
                  <label>Ngày cấp</label>
                  <input className="form-control" type="text"/>
                </div>
                <div className="col-xs-5">
                  <label >Nơi cấp</label>
                  <input className="form-control" type="text"/>
                </div>

              </div>
              <hr />
              <div className="custom">Thông tin nơi chuyển đến </div>
              <div className="form-group row">
                <div className="col-xs-4">
                  <label>Số hiệu TKGD nới đến</label>
                  <input className="form-control" type="text"/>
                </div>
                <div className="col-xs-3">
                  <label >Tên khách hàng</label>
                  <input className="form-control" type="text"/>
                </div>
                <div className="col-xs-3">
                  <label >Số ĐKSH</label>
                  <input className="form-control" type="text"/>
                </div>

              </div>
              <div className="form-group row">
                <div className="col-xs-3">
                  <label>Ngày cấp</label>
                  <input className="form-control" type="text"/>
                </div>
                <div className="col-xs-3">
                  <label >Nơi cấp</label>
                  <input className="form-control" type="text"/>
                </div>

              </div>
            </div>
          )
        }
      }
 module.exports = connect(function(state){
   return{
      infAccount:state.closeAccount.account.infAccount
   }
 })(FormModal);
