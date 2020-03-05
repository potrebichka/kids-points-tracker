import React from 'react';
import { withFirebase } from '../Firebase';
import {Button} from 'react-bootstrap';
// import PropTypes from 'prop-types';

const SignOutButton = ({onAuthChange, firebase }) => (
  <Button type="button" variant="danger" onClick={() => {firebase.doSignOut(); onAuthChange()}}>
    Sign Out
  </Button>
);

// SignOutButton.propTypes ={
//     onAuthChange: PropTypes.func
// }


export default withFirebase(SignOutButton);