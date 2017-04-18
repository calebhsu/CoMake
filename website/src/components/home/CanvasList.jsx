/**
 * @file HTML generation for the canvas list
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Grid, Flex, Box } from 'reflexbox';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import * as RC from '../../redux/reducers/ReducerConstants';
import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as FBStorageHelper from '../../helpers/FirebaseStorageHelper';

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
 * @classdesc Component for displaying list of available canvases.
 */
class CanvasList extends React.Component {
  /**
   * Constructor for CanvasList.
   * @param {Object} props The prop list for this component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    // Keeps track of whether we have attached listeners yet.
    this.listenersAttached = false;
    this.collectAndListenForCanvases = this.collectAndListenForCanvases.bind(this);
    this.createClickHandler = this.createClickHandler.bind(this);
    this.fetchCanvasInfo = this.fetchCanvasInfo.bind(this);
  }

  /**
   * When component mounts, if user ID is present, look up canvases from Firebase.
   * @returns {void}
   */
  componentDidMount() {
    if (!this.listenersAttached && this.props.userId) {
      this.collectAndListenForCanvases(this.props.userId);
    }
  }

  /**
   * When CanvasList recieves uid, perform look up canvases from Firebase.
   * @param {Object} nextProps The next props to be passed to the component.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.listenersAttached && nextProps.userId) {
      this.collectAndListenForCanvases(nextProps.userId);
    }
  }

  /**
  * Stop listening for new canvases to be added once we leave home page.
  * @returns {void}
  */
 componentWillUnmount() {
    if (this.props.userId){
      firebase.database().ref('/users').child(this.props.userId)
        .child(RC.CANVASES).off()
    }

    this.listenersAttached = false;
  }

  /**
   * Collects all canvases for userId and then listens for new canvases.
   * @param {string} userId the user ID to look up canvases for
   * @returns {void}
   */
  collectAndListenForCanvases(userId) {
    // If there is a valid username, fetch available canvas names.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).once('value').then((canvasListSnap) => {
        Object.keys(canvasListSnap.val()).forEach((canvasId) => {
          if ((Object.keys(this.props.canvases).indexOf(canvasId) < 0)
              && (canvasListSnap.val()[canvasId])) {
            this.fetchCanvasInfo(canvasId);
          }
      });
    });

    // Listen for any new canvases that might be added.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).on('child_added', (canvasSnap) => {
        if (canvasSnap.val()) {
          this.fetchCanvasInfo(canvasSnap.key);
        }
      });

    // Listen for any canvases that might be removed.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).on('child_changed', (canvasSnap) => {
        if (!canvasSnap.val()) {
          this.props.dispatch(CanvasActions.removeCanvas(canvasSnap.key));
        }
      });
    this.listenersAttached = true;
  }

  /**
   * Fetches information in canvas and dispatches action to update meta data.
   * @param {String} canvasId The ID for the canvas.
   * @returns {void}
   */
  fetchCanvasInfo(canvasId) {
    firebase.database().ref(`/canvases/${canvasId}`).once('value')
      .then((canvasSnap) => {
        const canvasObj = {};
        canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
        canvasObj[RC.CANVAS_OWNER] = canvasSnap.child('owner').val();

        let canvasUsersObj = canvasSnap.child('users').val();
        if(!canvasUsersObj) {
          canvasUsersObj = {};
        }
        canvasObj[RC.CANVAS_USERS] = canvasUsersObj;

        FBStorageHelper.getRenderedImageUrl(canvasId, (url) => {
          canvasObj[RC.CANVAS_IMAGE] = url;
          this.props.dispatch(CanvasActions.addCanvas(canvasId, canvasObj));
        });
    });
  }

  /**
   * Creates a click handler to handle the selection of a canvas.
   * @param {string} canvasId the ID to create the click handler for.
   * @returns {Function} A click handler for the specified canvasId
   */
  createClickHandler(canvasId) {
    return () => {
      this.props.dispatch(CanvasActions.setCurrentCanvas(canvasId));
    };
  }

  /**
   * Generates HTML for the user canvas list.
   * @returns {canvasList}  The array holding the canvas list HTML.
   */
  render() {
    const canvasList = [];

    Object.keys(this.props.canvases).forEach((canvasId, i) => {
      let canvasImage = this.props.canvases[canvasId][RC.CANVAS_IMAGE];
      if (!canvasImage) {
        // set to default image.
        canvasImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIWFRUVFxcXFxcXFxgXGBcXGBgXGB0YFxgYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi8dHyUtLS0tKy0rLS0tLSstLS0tLS0rLS0tLS0tLSstLS0tLS0tLS0tLS0tLSstLSsrLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADkQAAEDAQUGBAUEAQMFAAAAAAEAAhEDBAUhMUESUWFxgfCRocHRBhMiMrEUQuHxIxVScjOCkqLS/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EACYRAAICAgIBBAIDAQAAAAAAAAABAhEDIRIxBBMyQVEiYQUVQhT/2gAMAwEAAhEDEQA/AMIJUAJYVJISEsJwCEANhLCVKgBsIhORCBiQlTqVIuMAStay2IMxzPeSqyZYwLcWGU+ihRsLnZ4DjmeitssDRoTz9gr4CkPALFPyJvrRvh4sF+yiLPuAHRMcw+CtPPfeiYZ1w78lVzZd6cSi4TmB4KJ9Jp0jkff0hW6zVAXKyOWSKp4oPsqvpRkZ/Oe5RK09QPG5aYZ/sy5PH+YjUJGunDXcnQtKdoytUJCEsITEIkTkiAEQhCAFakcErUOQBGhEIQIcEqEIAEqEQgAQUqWEDGqSlSLiANU0hb1z2GG7RH1OjoFVlycEW4sfNi2WyhjYGep4qyyitehd2ExnvSOpAZd9+q5sm7tnUgktIz/03qlNCO+ithnfspK1CWkTCrss4mTWonQKF9LgtQ0IETMb9VE2jr2UWOjMdR173qs6h3xW26iqtWnwTUiLhZjuonvkoqlBalWmoHKxMrcDMfZ9rnoopIwd471qspziAnV7OCPdacc2jLlx2ZRCE99PZMaae3NNWtO9mJqtCJITkFSENhInIQArQmvCe1I9IZFCEqExCpQkCWEAKEIhEIAAlQAlQBbuqy/MqAZgee78Lv7nuySCRgPNc58IWfM8z5Z/jwXZXXbcNmPLBYsjUp7N2NOOPRZdZpmcN0epWPVssde/RatS05jecOR3KpVqKmaRbi5Io/p0j6JEq/p34Jrjh3xVXE0KbM11I995qN9NXaqico0WWUnsVevRWg9ROxSoVmPUpqLYhaNZqo1G4qaIsbSMJ72T30UJdCtUjKui9GeRk2yjI4jLvxWfK27VSxKx6gxPfeq14pGHKhqQpYQrykRCChAChI9OakqBIZDKEQhMRIhKhAgQlhCBgEqRPpjEc0mNHWXIdhvhK1bNWip0w71y8li0HARyHfkrlYkEOBn1nHJcyT3Z1YrVG1Uq6KHaUTau1r3j7KRsdfNQbJxVEu0Y6JEdEsJEiIpsKbZG7vqjYGiKHZVeO/FVnNICuvYJ75KM0yVEdmTWBVOscVqWumcVl1AmhMr2twAG85KWzVO++qqWnEhLMeatiymRcqme+96x7Y2HLTa/v0VG3haMT2Zcq0U0JUi1mQRCVCYhWoelah4SGRISoQIEqRKmIEJUIGCks/3Dmo1NZGy8KMumSj2jfYrgGGGPDwVVrclcpF2URE47+ffsuWzrInoVOHff4WhRb4KtZ6OElT/qGiBPmkotjstCEpaCFQq2tmW0PFK20DMFSqgRac5ND1A+vrmgv75qLZMswEx0KB9oWVeN+spzJ6Y+iklZGTouWrHBZVeksit8WicGyoanxGT+w9/hS9JlfrRL1anCrkIs15tqfSTDtxUjGweqOLXYWntBSOMQmV2yD33ipQyNM0MbtO771U4umUzRkgpUtSkZIjIx4JoW9OzA0wQhCBAAlclCRyBjEqRCYhQhCECFQgIQMFau5s1Wjiqq6Wy2OlDWMcBWYA508fTFVZZ8UXYcbnLXwOpMklvGOivBgaM8ANdwHsqjKJbVO8bsjpgeKtWp30niPFYGtnQT0Y9vvF9Z2xTLgBlsuictPZVnXJWOdT8g8plRvtTLO0kTO7WeXgs83zXtG2KOJYCXH9ojQDN50xwVyt6iVSpbkXzYnNzqY8wPEZK1ZLW5hgnDy7zXAf6/aZxrYnNvy27Mg4Nzy1npGq7Ow2esAwPYAajQ5oH2HCdnHFj43YFOcGlsMc03o6u764er9WiYOP8ACwLI7YjuFufq/p6LI3s1q2YN52xwwAlc1XJcZeYxjeTwAzPJbl4VJJGqqUbtqs2Sxu090n5hyptmIaNXHHDDTFWwdFc42yayU7PRaHVKRaMPqqbDJ4w4gqzUvKyVGw0sjIZRykYLn/i/4abUax1Ko51QAioKpMmYxbILWgRkIzWHZ/haowlzqjWGMNkzjhpAAyPitHCL3Zm5SuuJt3ldzc6Zx0j31WlYahc0TnksKwVKjDsvIjKchz4d9N2ywBmOABVc3qmWRW7Rc2dFDsmQG4cfHxOSc2pj3wT6bCXYZkgDxOveSrT0NxtlK8L0ZY/r2XOPAT/5HSVHaKzKzBXpiA7Bw3O/nHzXQXtYBUpRs/aDttOup54Subu6x/KFaj+2A9vIwVbjnTRZlxKeN/aIUiUpCtpyBwSPTmpr0AMSpqVAhyRKhMAQklKgAVw3fUqXjTcxxGGP/EtyPkqS6q6qwFUVg0GaY8oB8ws3kfBv8F7kv0WqlEtdjonlsgwAcI3flRU7c6sHve2Ifst4gNB9VZsOJgxnr3zWJmqvswX3J818Fuy3U4eWeOJ9tRZddraUCmQIGmHXy/K6R9MAR6enp7KhXu1pxIM8ShZGgUUc6+gxrtrYpzvhs5zoMVrWAA4lokQQSIy1A8FNRurHBoHTHxOKtmxkCAO+aHNskopFOz0fmVMRgDJ9u9ys2xsE9VdsVAMbB3qneQ+rDvBRa0Sh2cxeODp4q7dleQWSQDiOff4VW3ZxCbd4IcBoVL4B7Zaq2V04Qe576Jn6Nxw2D0/tarGg5+O9WNhpGfZS5icTD/00HNkecp1SxBv2wOgWo6mAVXtRACLsXFIx6pgqvedB76BLHbJY5rjGZGXfJWK2asXc4FtRpAIc2COGKsTK/wDSJ7nttT5cOdtSMZ5KvXA2nndT2fyAEXSIwO5Jep2WO3vdHQYnvipRVySLckuMGzEQhKugcQVqa9OCa9ADIQhKmIVCRKgQISJUAC6D4beCyo0/tEjr/P5XPrT+HawbWAOTwW9cCPbqq8quJf48uM0zVs1WGFuX1z5D2V6wPgp95WFjGS0RkSPRUqD8VzZHUdXZ0QMppYVDZKytOeo9jQ0JHOjPemPqgd8VTo29hf8AWcG7tSdPCU0iTWrNSo3Da8As+qPNPr3gx2IOGigqXlTPqnKJGGuzMvCzgrMo1Nlw8/daN6Xg3ksc3nT+3AnLinGLobas6lrQWgjHD+UwuWXd1s2DsOODsjuJWjXKg1RYmMqPCpWmpxTq5z73qjWeU0iEiKq5WLspkzukT4FU3YrUunZLS0mDMg9BgrPgph7kW6lia0gsaYIzJyKxL5qbTwwZMHmc/RbdS2llMtzJy4LIs1CTJzV2JV+TFmjLI1BGeLMUv6UrbFIJ/wAhW+sSX8Y62zC/TlRmgV0HyQmus4UlkKpfx7ukzn/kFC3fkhCPWRP+rkc8lTUSrjkCoSSgIGhUrXRiMxlzTQhIDtqt7sdRJkS4Ad9VVpDd32VyThOffRdTZn7TAd4H4xWDNi47Olizc9Ua1lepn11lMrY+XfilrVzMDNxgd9Fnao1RZLaKxcdluJPlxw3LLtVllhpkkE6jOd60m1BTETjIk7z7KKrWD8x1PJWRVBKaOMp3JamyW137M6/W3oJkdFHabTaaf3ND9JZJmN4zXaOc0CA3D3/pUX4mQ2CJ7HLuFbzv4Kqvo5kU7RX+4mm3d+4//P5Vi7blZSeHmOWeO8k4ree3Mlo9RzVRtIE7uuHH8o56BKh9bHFa1nr7VNpOeRWYGtEYnuFZ+YGtjQ5H3VUkWxmharx33+FRrP7959U6o4hVNr39URRDIyUGVN+jmHhzmnWIx8VWpnvRagbAA4KaLfEipTdkLxAiSeeqns2SY6nKuWVsBXV+Jb7c1paGNaVOHJ7yFVqnFQ6Nd+r+hLRVhRUK0qK1uwVeyFWpJxObklKOZRTNTBCg2kKNI28pnOSlKallazyoIlIhACyhIhAxVvXXVmmOGHT+lgLRuitEt5EevoqPIjcC/wAd1M1DVxzz1VimSCX6huHUnHyWbWd34qxRr7QiccjyH4zWFo6MWR2ivhJyxOHjO5Mp22m1sveBPjr7aJLRZfnfSXGNY16qnX+EqTsWbcgfbtEjzzVqpiUWy9Tvylk36uanpXvRP+6ehJ6rBZ8L04g7TXdZO6IUTvhtw+2s5o5TmOJx0Vnpx+zRCEqNm131T0EDiQqQvSi790LPZ8M/73l8zoRu0nOE0/DtFoiHTpDiDyR6cfsjKEu2i4+2Cc8OGHRaFIFzY0jpHvksel8P0gMSXHmYB4cVsUKJa2McoxVcml0Z+LTGVzLQdYHDcqtI58O/RS3jWGDRpAKga/ioroJO2WqAkgRmY76LT2pc7mVn3S2agwy/K0GDEnirIfJPCpN/iOISNqlOdimhqnaaNjxTjLRNiontUgqJpco2jQscvszbZKLECrlRgKWnShWqa4nPyeNNZUw2ShTYb0KHJGr08hyoSIRK1nmAlKmQnIGKhIhACq/crNp5G9h8RiFnlafw+f8AMORHkoZPYyzF70OruUDa8cj/AErt6UCHFwGeaoikIWA3mjQrSM93ZVulWj6hr7LPstHx7z3K0ymcvJRvZbFj7VawcHCevP271zH3uGmNioRx2SI4GcloGyE+qa6wKcZpE+U10Z5vcuP006mOsAYYakzuQ6rhgInP2V1lj4Ybkx9iz0Q5g5TfZBQdlwUltrkDDA+mOvRObSjCFn258GN+ftKitsqlKkUtomSf6UgOQ3xCYDGHYU1ip7Tsu/RWFLNu46UQTqFJT3qWyN2RJwABM7sE0twCUXdnR8KK5bAOSlyrOepWlSa0dCE4ym9jK1SEUakqR7E0NhStcSnhN5bvRK0ocVD8xLtSo1SLeSlkoSUIQoms52UEpJSLoHgxyE1KUDFRKagoAWUtjvVtO0UqeZc8Bx3B2A6yQqtutIpsJ105rk22hxL6k4ggg8QS70CTjaaJQdOz2K3MDhnPn3osZrNDpvVu7LwFopMqtP3NxGoOo6GVVtw2TK51PpnRb+US0KsEY4T6yPz5Ldoua4AyMp5rljVkZ9wls9vLZE/12UOFiU6OxpFh9t3NTFrY3+Hcrkf9T1DlYZfO9w068OSj6bLVkOjdTZwx1VSuaYWLVvcDGfBZ1ovicA7ph2E+DYPIka9ptLWg7zgB33gubqPBJ77z/ChtN4z9M+HNQGrvVsYUZ5ZLLZxxPffqtW7W9+ne5YbK0kDNb1hIIiPHvuVGWkShtly9a3y7LVdupujwjDxXB3d8TVKNQU6hLqbgCJOLQdx3TOC6L44t2xZvlg41HBv/AGiXE/8Ar5riLys+1SDx9zMemq0ePFcdlWbLKE1xdHdm2bWIMgqzSti4/wCHbbLQCeXBbsq5wXRXDyckXaZsfrFE+2LMlEqPpxLX5+X7LbrUZU1O2KgCo3FPinoqj5OSMuVmv+tSrF2kI9JF3/fk+xyE1zoxJhVqlvYNZ5KZgLaJWTWvf/a3qT6KhaLwe79xHLAJ0M6NzwMzHVUa16NBhv1Hfp/KwCCcyT6KzQZARQIS+LUSMSqVio/4Z1cSfbmkvh2Cs2Zv+Fn/ABH4TrQGp8EXmWOdQJjEuZuO8ec+K7OuQ9pI101XlFoc5hD2mHMIIPfRejXDeDbTRDxAI+8Tk6PxGIKyZ4U+SNuCdriULY91PGCR3/Cr/q21AQD6Eey6C02eRj+Asi1XQ0kxgeBg6a7lXGS+RygzPqh4+13Q+/8ACoVbRWBP0npirdssNanJb/kaMwPuHCNfJZbr2IMHaaZ1EK1K+tkGSC01jo7qnUi/9zo5Yn+PNVKl58yfBLZKFauYaCBvgwOqlX3oiW320NEDvmks5fUOULTsVwNZE/WcJ18Ny1qNjaNOx/aqc0uiccbfZXsFlLYkGe/NbYrBo/ACgDIy9uwoLdaBTY57jg0E+GipdyZoS4o5b4rtpfWDJxaJPN0QPCPFLSyAO5ZdAGo41H5vJJ78PBaJfEroRjxSRzskuUrKdzGJG4/gwuqs1baHHVcldRwnetmz19kqTIGzKFXo2oHDI95KeUgHhMclBTXIASUJEIA5upWLsyTzUZcmlBUgsa4oaEbKe0JiH02qeVG0YJXO777xSGZV8Ow73rRszf8AEz/iPx/KyL4Potprw2mCTADR+E2CM+q3PinfDd7OstaT9hweN439M1SfeYLj9P088ee5XrJYmVTjOUiNQozWt9E8cvy0epMLXtDmkEESDpEYKF7N/iqfwi1jGii5ztn9pnInTLJdQ65gf3Hy/pcuTSZ047Rh/KB7hZ143Ky0QCwk5bQwI6+i6wXU1uhPX0/tDqcYZfhCy10DxnB0PgoUztPJeMwMR471p06MYAQBkMguqDO+yo3WNj/u8QPVDyuXYLGl0c+ympWMC1X3KNHHqJSOuuP3+XslyRJRoy3mFx/xbb9twoNOAxqfkN47/BdZfc0KRcCC79oOp9l51TaZLnfc4yTvcTiVp8aFvl9GbyJ0qLFBsfhNvGrFMnXLvzUjMMFQvZ/2t4ytpgJrtGAWmCs+w5K7KGIdUensvJ7YxkHeooUVQCOSBmxRvVpzBH4VtlQOyMrm2FT03xiClQWbyFkfrH70IoRlpEIUgFT2pUJMCRiRyEIAw711Whef/QHIfgJUJsDniuiuHNv/ABQhGX2ksXuOxu77hzH5Xo7MhyQhcjJ2dfH0Oq5qtVySoVSGVNyvUckIQP5JzqqNp1QhAzjvjPJvJy4NunVCF0vF9rOd5XuJxn0WXef3jokQtKMpfsGStFCEAPGShfk7qlQhCGhStQhAEqEITA//2Q==";
      }
      canvasList.push(
        <Box
          col={12}
          sm={3}
          key={i}
          style={styles.models}
        >
          <Link to="/canvas">
            <Card onTouchTap={this.createClickHandler(canvasId)}>
              <CardMedia
                overlay={<CardHeader title={this.props.canvases[canvasId][RC.CANVAS_NAME]} />}
                overlayContentStyle={styles.overlay}
                >
                <img src={canvasImage} className={'img-responsive'} />
                {generateCanvasCode}
              </CardMedia>
            </Card>
          </Link>
        </Box>
      )
    });

    return (
      <Grid col={10} mt={3}>
        <Flex
          mt={3}
          mb={2}
          justify="flex-end"
          wrap
        >
          {canvasList}
        </Flex>
      </Grid>
    );
  }
}

CanvasList.propTypes = {
  dispatch: PropTypes.func,
  canvases: PropTypes.object,
  userId: PropTypes.string,
}

const mapStateToProps = state => ({
  canvases: (state.canvasReducer[RC.CANVASES]),
  userId: (state.userInfoReducer[RC.USER_INFO][RC.USER_ID]),
});

export default connect(mapStateToProps)(CanvasList);
