import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white, grey900, grey700 } from 'material-ui/styles/colors';

import DashNavBar from './dashboard/DashNavBar';
import LandingNavBar from './landing/LandingNavBar';

import { getAuthState } from '../helpers/LoginHelper';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#e74c49',
    alternateTextColor: grey900,
    disabledColor: grey700,
    primary1Color: white,
    primary2Color: '#a7d2cb',
    primary3Color: white,
    textColor: '#e74c49',
  },
  menuItem: {
    hoverColor: '#f7f7f7',
  },
  raisedButton: {
    secondaryTextColor: white,
  },
  slider: {
    handleColorZero: '#e74c49',
    selectionColor: '#42aeb5',
    trackColor: '#a7d2cb',
  },
  snackbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: white,
  },
  textField: {
    focusColor: '#42aeb5',
    textColor: grey900,
  },
});

/**
 * Creates the main layout for pages that require login.
 * @class MainLayout
 */
class MainLayout extends Component {
  /**
   * Constructor for the class
   * @param {Object} props The props to be passed in.
   * @returns {void}
   */
  constructor(props) {
    super(props);
  }

  /**
   * Checks whether user is logged in before component mounts.
   * @returns {void}
   */
  componentWillMount() {
    getAuthState(this.props.dispatch);
  }

  /**
   * @method MainLayout#render
   * @returns {HTML} Rendered layout
   */
  render() {
    const nav = this.props.authState ? <DashNavBar /> : <LandingNavBar />;

    return (
      <MuiThemeProvider
       muiTheme={muiTheme}
      >
        <div>
           {nav}
           {React.cloneElement(this.props.children, {authState: this.props.authState})}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.userInfoReducer.authState,
});

MainLayout.propTypes = {
  authState: PropTypes.bool,
  children: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(mapStateToProps)(MainLayout);
