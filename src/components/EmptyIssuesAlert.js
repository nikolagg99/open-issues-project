import React from 'react';

import './style/EmptyIssuesAlert.scss';

const EmptyIssuesAlert = () => {
  return (
    <div className='empty-issues-alert-container'>
      <h1 className='alert-h1'>There are no issues in this repository.</h1>
    </div>
  );
};

export default EmptyIssuesAlert;
