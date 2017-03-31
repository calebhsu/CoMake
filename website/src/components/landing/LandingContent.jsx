import React from 'react';
import { Box, Flex } from 'reflexbox';

import Group from 'material-ui/svg-icons/social/group';
import Share from 'material-ui/svg-icons/editor/highlight';
import { black, grey800 } from 'material-ui/styles/colors';

const styles = {
  about: {
    color: black,
    textAlign: 'center',
  },
  blurbHeader: {
    fontWeight: 600,
  },
  blurbSub: {
    color: grey800,
    fontSize: '1.3em',
    lineHeight: '1.6em',
  },
  icon: {
    fontSize: '4em',
    height: '1.6em',
    width: '1.5em',
  },
};

/**
 * Gives HTML for the About content in the Landing page.
 * @returns {HTML}   The HTML of the About content.
 */
function LandingContent() {
  return (
    <Flex
      align="stretch"
      justify="space-around"
      px={5}
      py={5}
      style={styles.about}
      wrap
    >
      <Box col={12} sm={12} mb={2}>
        <h2 style={styles.blurbHeader}>Collaborative 3D modeling</h2>
        <p style={styles.boxText, styles.blurbSub}>
          Users import models from CraftML, arrange them on a 2D canvas, and export the result
          into CraftML code. Take a look at how it works below:
        </p>
      </Box>
    </Flex>
  );
}

export default LandingContent;
