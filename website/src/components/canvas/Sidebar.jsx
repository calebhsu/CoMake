import React from 'react';

import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';

import RotationSlider from './RotationSlider';

const styles = {
  listItems: {
    marginTop: 20,
  },
  propertiesSpacing: {
    marginLeft: 10,
    marginRight: 20,
  },
  sidebar: {
    marginTop: 120,
    overflowX: 'hidden',
  },
};

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
          <div containerStyle={styles.propertiesSpacing}>
          <ul>
            <li>
              <h3>Rotate</h3>
            </li>
              <RotationSlider/>
            <li>
              <h3>Resize</h3>
            </li>
            <li>
              <TextField
                hintText="Current: 64px"
                floatingLabelText="Height"
                fullWidth={true}
              /><br />
            </li>
            <li>
              <TextField
                hintText="Current: 64px"
                floatingLabelText="Width"
                fullWidth={true}
              /><br />
            </li>
          </ul>
          </div>
        </Drawer>
      </div>
    );
  }
}
