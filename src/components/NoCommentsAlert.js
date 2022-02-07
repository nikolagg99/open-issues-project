import React from 'react';

import './style/NoCommentsAlert.scss'

const NoCommentsAlert = () => {
  return (
    <div className="missing-comments-alert">
      <h2>There are no comments for this issue.</h2>
    </div>
  );
};
export default NoCommentsAlert;
