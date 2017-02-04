import React from 'react';
import NavBar from './NavBar';

const styles = {
  container: {
    marginTop: '3em',
    textAlign: 'center',
  }
};

/**
 * Gives HTML for the home page after login.
 * @return {HTML}   The HTML of the home page.
 */
function Home() {
  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <p>Here's proof that React Router is working yay.</p>
      </div>
    </div>
  );
}

export default Home;
