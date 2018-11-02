import React from 'react';
module.exports = class RowItemMoney extends React.Component {

  render () {

    return (

      <tr >



        <td>{this.props.maccq}</td>
        <td>{this.props.tong}</td>
        <td>{this.props.khadung}</td>
        <td>{this.props.muachove}</td>
        <td>{this.props.banchora}</td>

      </tr>
    )
  }
}
