import React from 'react';
import {connect} from 'react-redux';
import Paging from './Components/Paging';
import {Popover,OverlayTrigger,Tooltip,Button,Modal,Pagination} from 'react-bootstrap'
import ModalCloseAccount from 'ModalCloseAccount';
import FormCloseAcount from 'FormCloseAcount';
import RowItemAcount from 'RowItemAcount';
import Tb_Account from 'Tb_Account';
import axios from 'axios';
import {showModal,search,updateNumberPage,updatePagePageSize} from 'actionCloseAccount'
class CloseAccount2 extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          selectedRows: new Set(),

          checked: false,
          pagesize:"5",
          activePage:"1"

      };
  }
  handleSelectedRows(selectedRow, checked) {
    console.log(selectedRow);
    console.log(checked);
    let selectedRows = this.state.selectedRows
    if (checked) {
      selectedRows.add(selectedRow)
    } else {
      selectedRows.delete(selectedRow)
    }
    this.setState({selectedRows})
  }
  removeSelected () {
     let selectedRows = this.state.selectedRows;
     selectedRows.clear();
     this.setState({checked: false, selectedRows});
  }

  checkedClick () {
    this.setState({checked: !this.state.checked})
  }

  save() {
    this.setState({ showModal: false });
    console.log('okkk fine');
  }
  selectPageSize(pagesize){
    console.log(pagesize);
    var {dispatch} =this.props;
    io.socket.post('/userindex/'+this.props.typeSearch,{pagesize:pagesize,page:1,keySearch:this.props.keySearch}, function(resData, jwres){
        console.log(resData);
         dispatch(search(resData.data));
         dispatch(updateNumberPage(resData.numPerPage));
      });
    this.props.dispatch(updatePagePageSize({page:"1",pagesize:pagesize}))


  }
  selectPage(page,pagesize) {
    console.log(page+ " "+ pagesize);
        var {dispatch} =this.props;
    io.socket.post('/userindex/'+this.props.typeSearch,{pagesize:pagesize,page:page,keySearch:this.props.keySearch}, function(resData, jwres){
        console.log(resData);
         dispatch(search(resData.data));
         dispatch(updateNumberPage(resData.numPerPage));
      });
    this.props.dispatch(updatePagePageSize({page:page,pagesize:pagesize}))
  }

  render(){
    return(
      <div className="col-xs-9 panel panel-success layout-close-account">
        <div className="title">Yêu cầu đóng tài khoản</div>


        <hr />
        <FormCloseAcount  />
        <ModalCloseAccount />
        <hr />
        <Tb_Account listCustomerInfo={this.props.listCustomerInfo}

         selectedRows ={this.state.selectedRows}
         checkedClick={this.checkedClick.bind(this)}
         checked={this.state.checked}
         handleSelectedRows ={this.handleSelectedRows.bind(this)}
        />
         <Paging numPerPage={this.props.numPerPage} selectPage={this.selectPage.bind(this)} selectPageSize={this.selectPageSize.bind(this)} />
      </div>
    );
  }
}
module.exports = connect(function (state){
  return {listCustomerInfo: state.closeAccount.listCustomerInfo,
          infAccount:state.infAccount,
          numPerPage:state.closeAccount.numPerPage,
          typeSearch:state.closeAccount.typeSearch,
          keySearch:state.closeAccount.keySearch
  };
})(CloseAccount2);
