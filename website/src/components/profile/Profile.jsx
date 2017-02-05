import React, { Component } from 'react';
import { Box, Flex } from 'reflexbox';

import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

const styles = {
  fields: {
    marginLeft: 30,
    textAlign: 'left',
  },
  container: {
    marginTop: 15,
  },
  header: {
    backgroundColor: '#49937f',
    color: '#FFFFFF',
    marginTop: 0,
    padding: '15px 10px',
    textTransform: 'uppercase',
  },
  paper: {
    display: 'inline-block',
    height: '85vh',
    margin: 30,
    minHeight: 500,
    textAlign: 'center',
    width: '90%',
  },
};

/**
 * Gives HTML of a user's profile page.
 * @return {HTML}   The HTML of a profile page.
 */
export default class Profile extends Component {
  constructor() {
      super();
      this.state = {
          value: 1,
      }
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <Flex
          align="stretch"
          justify="space-around"
          style={styles.container}
          wrap
        >
          <Box col={12} sm={12} md={6}>
            <Paper style={styles.paper} zDepth={2}>
              <h2 style={styles.header}>My Profile</h2>
              <Avatar src="http://placekitten.com/310/311" size="200"/>
              <div style={styles.fields}>
                <TextField
                  hintText="Vin"
                  floatingLabelText="First Name"
                />
                <TextField
                  hintText="Diesel"
                  floatingLabelText="Last Name"
                /><br />
                <TextField
                  hintText="vin.diesel@gmail.com"
                  floatingLabelText="Email"
                /><br />
                <SelectField
                  floatingLabelText="My Groups"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="Class 1" />
                  <MenuItem value={2} primaryText="Class 2" />
                  <MenuItem value={3} primaryText="Class 3" />
                </SelectField>
              </div>
            </Paper>
          </Box>
          <Box col={12} sm={12} md={6}>
            <Paper style={styles.paper} zDepth={2}>
              <h2 style={styles.header}>Classroom Details</h2>
              <div style={styles.fields}>
                <TextField
                  hintText="Fast & Furious"
                  floatingLabelText="Name"
                /><br />
                <TextField
                  hintText="Names here"
                  floatingLabelText="Members"
                /><br />
                <TextField
                  hintText="Names here"
                  floatingLabelText="Admins"
                /><br />
                <TextField
                  hintText="Names here"
                  floatingLabelText="Share"
                />
              </div>
            </Paper>
          </Box>
        </Flex>
      </div>
    )
  }
}
