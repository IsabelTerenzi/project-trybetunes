import React from 'react';
import { FiAlertOctagon } from 'react-icons/fi';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <h1>Error 404 page not found</h1>
        <FiAlertOctagon size={ 350 } color="rgb(43, 218, 81)" />
      </div>
    );
  }
}

export default NotFound;
