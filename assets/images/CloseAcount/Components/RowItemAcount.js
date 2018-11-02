import React from 'react';
import {connect} from 'react-redux';
import {showModal} from 'actionCloseAccount';
import axios from 'axios';
 var RowItemAcount = React.createClass( {
  open(){
    console.log('showModalsss');
  },
  show(id){
    console.log(id);
    var {dispatch} = this.props;
    io.socket.post('/userindex/get',{shtk:id},function(resData, jwres){
        console.log(resData);
        dispatch(showModal(resData));

   });
    // axios.post('user/getInf',{id:id})
    // .then(res => {
    //    dispatch(showModal(res.data));
    //    console.log(res.data)
    // })
    // .catch(err => console.log(err))


  },
  render () {

    return (

      <tr onDoubleClick ={this.show.bind(null,this.props.shtk)}>
       <div className ="check-box-item">

        <input   onChange={(event) => {


            this.props.handleSelectedRows(this.props.id, event.target.checked);}}   checked={this.props.value} type="checkbox"  name={this.props.Identifier}  />


        </div>

        <td>{this.props.shtk}</td>


        <td>{this.props.ten}</td>
        <td>{this.props.sodksh}</td>
        <td>{this.props.ngapcap}</td>
        <td>{this.props.noicap}</td>
        <td>{this.props.diengiai}</td>

        <td>{this.props.trangthai}</td>
      </tr>
    )
  }
});
module.exports = connect(function (state){
  return {

  };
})(RowItemAcount);
