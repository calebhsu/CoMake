import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import { Flex, Grid } from 'reflexbox'
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
    marginTop: 120,
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
        >
        <Flex column>
          <Grid col={12} p={1}>
            <h3>Rotate</h3>
          </Grid>
          <Grid col={12} p={1}>
            <RotationSlider/>
          </Grid>
          <Grid col={12} p={1}>
            <h3>Resize</h3>
          </Grid>
          <Grid lg={12} p={2}>
            <TextField
              hintText="Current: 64px"
              floatingLabelText="Height"
              fullWidth="true"
            /><br />
          </Grid>
          <Grid lg={12} p={2}>
            <TextField
              hintText="Current: 64px"
              floatingLabelText="Width"
              fullWidth="true"
            /><br />
          </Grid>
        </Flex>
        </Drawer>
      </div>
    );
  }
}
