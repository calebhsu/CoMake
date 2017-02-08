import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.setOpen = this.setOpen.bind(this);
    this.setClose = this.setClose.bind(this);
    this.listObject = ['Add New Object',
                       'Options',
                       'User List',
                       'Resize',
                       'Select Color',
                       'Sign Out'];
    this.key;
    this.listItems = this.listObject.map((item)=><MenuItem key={item.toString()} onTouchTap = {this.setClose}>{item}</MenuItem>);
  }

  setOpen() {
    this.setState({open: !this.state.open});
  }

  setClose(){
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <FlatButton
          label="Sidebar"
          onTouchTap={this.setOpen}
        />
        <Drawer open={this.state.open}
                docked={false}
                onRequestChange={(open) => this.setState({open})}
                openSecondary={true}
        >
        {this.listItems}
        </Drawer>
      </div>
    );
  }
}
