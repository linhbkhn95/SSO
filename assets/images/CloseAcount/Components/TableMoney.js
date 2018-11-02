import React from 'react';
import RowItemMoney from 'RowItemMoney';
import {connect} from 'react-redux';
var TableMoney = React.createClass({
  renderList(){
       console.log(this.props.listMoney)
       if(this.props.listMoney!=null){
          return(
          this.props.listMoney.map((row,index) => {
            return (
              <RowItemMoney

                maccq={row.maccq}
                khadung={row.khadung}
                muachove={row.muachove}
                tong={row.tong}
                key={index}
                banchora={row.banchora}

              />
          )

     })
   )
    }
   },
   render(){
      return(

            <table className="table table-hover">
              <thead>



             <tr>
                  <th>Mã CCQ</th>
                  <th>Tổng</th>
                  <th>Khả dụng</th>
                  <th>Mua chở về</th>
                  <th>Bán chời giao</th>

                </tr>
              </thead>
              <tbody>
                    {this.renderList()}
              </tbody>
            </table>
      )
   }
})
module.exports = connect(function (state){
  return {
         listMoney:state.closeAccount.account.listMoney
  };
})(TableMoney);
