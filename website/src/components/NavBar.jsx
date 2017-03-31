import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import { grey900 } from 'material-ui/styles/colors';

import CreateCanvas from './CreateCanvas';

import { getUserInfo, signOut } from '../helpers/LoginHelper';

const styles = {
  dropdownIcon: {
    verticalAlign: 'middle',
  },
  title: {
    color: grey900,
  },
  navBtn: {
    height: 64,
  },
  navBtnLabel: {
    fontWeight: 600,
    letterSpacing: 1,
  },
  navUser: {
    color: grey900,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  userElement: {
    margin: 0,
  },
};

/**
 * @classdesc The nav bar for the page.
 */
class NavBar extends React.Component {
  /**
   * Constructor for the class.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Function to be triggered on NavBar mounting, fetches user's information.
   * @returns {void}
   */
  componentDidMount() {
    getUserInfo(this.props.dispatch);
  }

  /**
   * Renders the NavBar.
   * @returns {HTML} The html to be dispalyed.
   */
  render() {
    let photoURL = "";
    let username = "";
    if (this.props.userInfo) {
      photoURL = this.props.userInfo.photo;
      username = this.props.userInfo.name;
    }
    return (
      <AppBar
        title="comake"
        titleStyle={styles.title}
        iconStyleRight={styles.userElement}
        iconElementLeft={
          <Link to="/home">
            <IconButton><Home color={grey900} /></IconButton>
          </Link>
        }
      >
        <CreateCanvas />
        <Link to="/profile">
          <FlatButton
            style={styles.navBtn}
          >
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar src={photoURL} />
              }
              style={styles.navUser}
            >
              {username}
            </ListItem>
          </FlatButton>
        </Link>
        <FlatButton
          label="User Guide"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
        />
        <FlatButton
          label="Log Out"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
          onClick={signOut}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps)(NavBar);
