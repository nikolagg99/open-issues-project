import React, { useState } from 'react';
import './style/FormComponent.scss'

const FormComponent = (props) => {
    const [username, setUsername] = useState('');
    const [repoName, setRepoName] = useState('');

    // Functions for getting username and reponame onChange inpiut field
    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onRepoNameChange = (event) => {
        setRepoName(event.target.value);
    }
    ///////

    // Function for fetching the issues from GitHub API
    const getIssues = async(e) => {
        e.preventDefault();
        fetch(
          `https://api.github.com/repos/${username}/${repoName}/issues`
        ).then((response) => {
          if (response.status === 200) {
            props.onRouteChange("issues");
            props.userInfo(username, repoName);
          } else {
            alert('Enter valid username and repositiry name')
            setUsername('');
            setRepoName('');
          }
        });
    }
   
  return (
    <form className="input-form" onSubmit={getIssues}>
      <div className="form-container">
        <div className="form-items">
          <label className="username-label">Username: </label>
          <input 
            type="text" 
            name="username"
            required
            onChange={onUsernameChange} 
            value={username}
        ></input>
        </div>

        <div className="form-items">
          <label className="repo-name-label">Repository Name: </label>
          <input 
            type="text" 
            name="repo-name"
            required
            onChange={onRepoNameChange}    
            value={repoName}
        ></input>
        </div>

        <div className="form-items button-container">
          <button className="submit-button"> Submit </button>
        </div>

      </div>
    </form>
  );
};

export default FormComponent;
