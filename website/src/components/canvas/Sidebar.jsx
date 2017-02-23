import React from 'react';
import Drawer from 'material-ui/Drawer';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

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
  slider: {
    width: '10vw',
    marginLeft: 10,
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
        <div>
          <h3>Rotate</h3>
          <RotationSlider />
          <Slider defaultValue={0.5} style={styles.slider}/>
          <h3>Resize</h3>
          <TextField
            hintText="Enter new height"
            floatingLabelText="Height: 64px"
          /><br />
          <TextField
            hintText="Enter new width"
            floatingLabelText="Width: 64px"
          /><br />
        </div>
        </Drawer>
      </div>
    );
  }
}
