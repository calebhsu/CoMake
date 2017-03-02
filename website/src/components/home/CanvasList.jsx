/**
 * @file HTML generation for the canvas list
 */
import React from 'react';
import { Box } from 'reflexbox';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';

const styles = {
  models: {
    display: 'inline-block',
    margin: 10,
  },
  overlay: {
    padding: 0,
    margin: 'auto',
  },
};

const generateCanvasCode = (
    <img src="https://res.cloudinary.com/craftml/image/upload/w_250,h_250,c_fill/v1440024165/4yUaf.png" className='img-responsive' />
 );

/**
 * Generates HTML for the user canvas list.
 * @returns {canvasList}  The array holding the canvas list HTML.
 */
function CanvasList() {
  //TODO
  //Add firebase call to get canvas IDs and img src
  let canvasList = [];
  let numCanvases = 7;
  let numCols = 3;
  if(numCanvases > 10)
      numCols = 1;
  else if (numCanvases > 5)
      numCols = 2;
  else
    numCols = 3;

  for (let i = 0; i < numCanvases; i++){
    canvasList.push(
      <Box col={numCols} style={styles.models} key={i}>
        <Link to="/canvas">
          <Card>
            <CardMedia
              overlay={<CardHeader title="Racecar" />}
              overlayContentStyle={styles.overlay}
            >
              {generateCanvasCode}
            </CardMedia>
          </Card>
        </Link>
      </Box>
      )
  }
  return (<div> {canvasList} </div>);
}

export default CanvasList;
