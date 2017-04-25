import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';

import { signOut } from '../../helpers/LoginHelper';

const styles = {
  appbar: {
    height: 55,
    position: 'fixed',
  },
  dropdownIcon: {
    verticalAlign: 'middle',
  },
  title: {
    color: '#e74c49',
    fontWeight: 600,
  },
  navBtn: {
    height: 55,
  },
  navBtnLabel: {
    fontWeight: 600,
    letterSpacing: 1,
  },
  navUser: {
    backgroundColor: '#a7d2cb',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  userElement: {
    margin: 0,
  },
};

/**
 * @classdesc The nav bar for the authenticated pages.
 */
class DashNavBar extends React.Component {
  /**
   * Constructor for the class.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
    this.clearStoreAndSignOut = this.clearStoreAndSignOut.bind(this);
  }

  /**
   * Clears the redux store and signs out
   * @returns {void}
   */
  clearStoreAndSignOut() {
    signOut(this.props.dispatch);
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
          <Link to="/">
            <IconButton><Home color="#e74c49" /></IconButton>
          </Link>
        }
        style={styles.appbar}
      >
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
        <FlatButton
          label="User Guide"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
        />
        <FlatButton
          label="Log Out"
          labelStyle={styles.navBtnLabel}
          style={styles.navBtn}
          onClick={this.clearStoreAndSignOut}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

DashNavBar.propTypes = {
  dispatch: PropTypes.func,
  userInfo: PropTypes.object
}

export default connect(mapStateToProps)(DashNavBar);
