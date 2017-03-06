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
    this.state = {
      opacity: .7
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter() {
    this.setState({opacity: 1})
  }

  mouseLeave() {
    this.setState({opacity: .7})
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    return (
      <div>
      <div
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
      >
        <Drawer containerStyle={styles.sidebar}
                open= {true}
                docked={true}
                openSecondary={false}
                style={{opacity: this.state.opacity}}
                zDepth={3}
        >
          <div style={styles.propertiesSpacing}
          >
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
      </div>
    );
  }
}
