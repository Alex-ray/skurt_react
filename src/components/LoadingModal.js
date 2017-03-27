import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';

const propTypes = {
  loading: PropTypes.bool.isRequired
};

class LoadingModal extends Component {
  render () {
    const {
      loading
    } = this.props;

    return (
      <Modal show={loading} backdrop='static' dialogClassName='loading-dialog-center'>
        <Modal.Body>
          <i className='fa fa-fw fa-3x fa-spinner fa-spin fa-pulse'></i>
          <span className="sr-only">Loading...</span>
        </Modal.Body>
      </Modal>
    );
  }
}

LoadingModal.propTypes = propTypes;

export {LoadingModal};
