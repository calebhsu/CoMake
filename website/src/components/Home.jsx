import React, { PropTypes } from 'react';

import Dashboard from './dashboard/Dashboard';
import Landing from './landing/Landing';

class Home extends React.Component {
   /**
    * Renders HTML for the home page depending on whether user is
    * logged in or not.
    * @returns {HTML}    The HTML of the home page.
    */
   render() {
     const page = this.props.authState ? <Dashboard /> : <Landing />;

     return (
       <div>
         {page}
       </div>
     );
   }
 }

 Home.propTypes = {
   authState: PropTypes.bool,
 }

export default Home;
