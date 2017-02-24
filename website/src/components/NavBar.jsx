import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import { white } from 'material-ui/styles/colors';

import { getUserInfo, signOut } from '../helpers/LoginHelper';

const styles = {
  btn: {
    height: 64,
  },
  dropdownIcon: {
    verticalAlign: 'middle',
  },
  user: {
    color: white,
    fontSize: 14,
    height: 50,
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
        title="CoMake"
        iconElementRight={
          <div>
            <Link to="/profile">
              <FlatButton
                secondary={true}
                style={styles.btn}
              >
                <ListItem
                  disabled={true}
                  leftAvatar={
                    <Avatar src={photoURL} />
                  }
                  style={styles.user}
                >
                  <span>
                    {username}
                    <Down color={white} style={styles.dropdownIcon} />
                  </span>
                </ListItem>
              </FlatButton>
            </Link>
            <FlatButton
              label={"Log Out"}
              labelStyle={styles.user}
              style={[styles.user, styles.btn]}
              onClick={signOut}
            />
          </div>
        }
        iconStyleRight={styles.userElement}
        iconElementLeft={
          <Link to="/home">
            <IconButton><Home color={white} /></IconButton>
          </Link>
        }
      />
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func,
  userInfo: PropTypes.object,
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer.userInfo,
});

export default connect(mapStateToProps)(NavBar);
