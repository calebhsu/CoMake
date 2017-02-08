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
          label="Toggle Sidebar"
          onTouchTap={this.setOpen}
        />
        <Drawer open={this.state.open}
                docked={false}
                onRequestChange={(open) => this.setState({open})}
                openSecondary={true}
        >
          <MenuItem onTouchTap = {this.setClose}>User 1</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 2</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 3</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 4</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 5</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 6</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 7</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 8</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 9</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>User 10</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>Options</MenuItem>
          <MenuItem onTouchTap = {this.setClose}>Sign Out</MenuItem>
        </Drawer>
      </div>
    );
  }
}
