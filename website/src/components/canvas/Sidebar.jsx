import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';

import RotationSlider from './RotationSlider';

const styles = {
  featureSpacing: {
    marginLeft: 10,
    marginRight: 20,
  },
  listItems: {
    marginTop: 20,
  },
  sidebar: {
    marginTop: 114,
    width: '12vw',
    xOverflow: 'hidden',
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
                zDepth={2}
        >
        <div style={styles.featureSpacing}>
          <h3>Rotate</h3>
          <RotationSlider/>
          <h3>Resize</h3>
          <TextField
            hintText="Enter new height: 64px"
            floatingLabelText="Height"
            fullWidth="true"
          /><br />
          <TextField
            hintText="Enter new width: 64px"
            floatingLabelText="Width"
            fullWidth="true"
          /><br />
        </div>
        </Drawer>
      </div>
    );
  }
}
