import React, {Component, PropTypes} from 'react';

const propTypes = {
  errors: PropTypes.array
};

class ErrorList extends Component {

  _buildErrorNodes (errors) {
    let nodes = [];

    for (var i = 0; i < errors.length; i++) {
      let error = errors[i];
      nodes.push(
        <li key={i} className="alert alert-danger" role="alert">
          <i className='fa fa-info-circle fa-fw'></i>
          <span className="sr-only">Error:</span>
          {error.message}
        </li>
      );
    }
    return nodes;
  }

  render () {
    const {
      errors
    } = this.props;

    let listItems = this._buildErrorNodes(errors);

    return (
      <ol className='list-unstyled col-sm-6 col-sm-offset-3'>
        {listItems}
      </ol>
    );
  }
}

export {ErrorList};
