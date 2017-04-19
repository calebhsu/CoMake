import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Dashboard from './dashboard/Dashboard';
import Landing from './landing/Landing';

class Home extends React.Component {
   /**
    * Renders HTML for the home page depending on whether user is
    * logged in or not.
    * @returns {HTML}    The HTML of the home page.
    */
   render() {
     const userId = this.props.userInfo.userId;
     const page = userId ? <Dashboard /> : <Landing />;

     return (
       <div>
         {page}
       </div>
     );
   }
 }

 const mapStateToProps = state => ({
   userInfo: state.userInfoReducer.userInfo,
 });

 Home.propTypes = {
   userInfo: PropTypes.object
 }

export default connect(mapStateToProps)(Home);
