import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RotationSlider from './RotationSlider';

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

const LIST_OBJECTS = ['Create New',
                      'Add New Object',
                      'Options',
                      'User List',
                      'Resize',
                      'Select Color',
                      'Sign Out'];

/**
 * @classdesc Sidebar for the canvas page.
  */
export default class Sidebar extends React.Component {
  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
    this.listItems = LIST_OBJECTS.map(this.mapOptionToDiv);
  }

  /**
   * Maps list item to a div to put in the drawer.
   * @param {String} item The item name to encapsulate into a ManueItem.
   * @returns {HTML} A MenuItem tag that holds the name of the item.
   */
  mapOptionToDiv(item) {
    return (<MenuItem key={item.toString()}>
      {item}
    </MenuItem>);
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
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
        <RotationSlider />
        </Drawer>
      </div>
    );
  }
}
