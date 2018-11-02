import React from 'react';
import RowItemAcount from 'RowItemAcount';
import {connect} from 'react-redux';
import axios from 'axios';
import {search,updateNumberPage} from 'actionCloseAccount';
var Tb_Account= React.createClass({
  componentDidMount(){
        console.log('getAll_AcountClose');
        var {dispatch} = this.props;

        io.socket.get('/userindex/getAll',{pagesize:5,page:1}, function(resData, jwres){
            console.log(resData);
             dispatch(search(resData.data));
             dispatch(updateNumberPage(resData.numPerPage));
      });

        // axios.get('user/getAll_AcountClose')
        //   .then(res => {
        //      console.log(res.data);
        //      dispatch(search(res.data));
        //      console.log('res.data');
        //    })
        //   .catch(err => console.log(err));


  },
  renderList(){
    console.log('cmm');
   return this.props.listCustomerInfo.map(customer => {
        return (
          <RowItemAcount


            handleSelectedRows={this.props.handleSelectedRows}
            shtk={customer.shtk}
            sodksh={customer.sodksh}
            ten={customer.ten}
            key={customer.id}
            id={customer.id}
            ten={customer.ten}
            diengiai ={customer.diengiai}
            tranthai={customer.trangthai}
            ngaycap ={customer.ngaycap}
            noicap ={customer.noicap}
            value={this.props.checked || this.props.selectedRows.has(customer.id)}
          />
        )
     })
   },
   render(){
      return(
        <table className="table table-hover">
          <thead>
            <tr  className="success">
              <th className="active">
                  <input onChange={this.props.checkedClick} checked={this.props.checked} type="checkbox"  />


               </th>
              <th>Số hiệu TKGD</th>
              <th>Tên khách hàng</th>
              <th>Số ĐKSH</th>
              <th>Ngày cấp</th>
              <th>Nơi cấp</th>
              <th>Diễn giải</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
                {this.renderList()}
          </tbody>
        </table>
      )
   }
});
module.exports = connect(function(state){
   return{}
})(Tb_Account);
