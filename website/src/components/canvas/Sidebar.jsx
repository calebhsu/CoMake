import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  listItems: {
    marginTop: 20,
  },
  sidebar: {
    backgroundColor: 'rgba(1, 1, 1, .06)',
    marginTop: 114,
    width: '12vw',
  },
};

/**
  * Gives HTML for options sidebar.
  * @returns {HTML}   The HTML of a sidebar on the canvas page
  */
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.listObject = ['Create New',
                       'Add New Object',
                       'Options',
                       'User List',
                       'Resize',
                       'Select Color',
                       'Sign Out'];
    this.listItems = this.listObject.map((item)=><MenuItem key={item.toString()} onTouchTap = {this.setClose}>{item}</MenuItem>);
  }

  render() {
    return (
      <div>
        <Drawer containerStyle={styles.sidebar}
                open= {true}
                docked={true}
                openSecondary={false}
        >
        <div style={styles.listItems}>
          {this.listItems}
        </div>
        </Drawer>
      </div>
    );
  }
}
