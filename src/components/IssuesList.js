import React, { useEffect, useState } from 'react';
import EmptyIssuesAlert from './EmptyIssuesAlert';

import image from './style/explanation.png';

import './style/IssuseList.scss';

const IssuesList = (props) => {
  const [username, setUsername] = useState();
  const [reponame, setRepoName] = useState();
  const [issues, setIssues] = useState([]);

  // Clear the user info from localStorage and redirect to Form Component
  let clearInfo = () => {
    props.onRouteChange('clear');
  }

  // Function for showing the comment box
  let showComments = () => {
    props.toggleCommentBox(true);
  }

  // Function to get comments url and pass it to CommentsBox
  let getComments = (comments) => {
    props.getComments(comments);
  }

  useEffect(() => {
    // Get username and reponame info from localstrage
    let username = localStorage.getItem('username');
    let repoName = localStorage.getItem('reponame');

    // Setting the state for username and reponame
    setUsername(username);
    setRepoName(repoName);

    //Fetching data from github API server
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/issues`
        );
        const result = await response.json();
        setIssues(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();  
  }, [])

  return (
    <div className="list-container">
      <h1 className="header">List of Issues</h1>
      <h2 className="user-info-h2">
        Username: {username} - repo: {reponame}
      </h2>
      <div className='button-clear-container'>
        <button onClick={clearInfo} className="clear-info-button">
          Clear
        </button>
      </div>

      {issues.length === 0 ?<EmptyIssuesAlert /> : issues.map((data) => {
        return (
          <div key={data.id} className="list-item">

            <div className="title-container">
              <h2 onClick={(e)=>{getComments(data.comments_url); showComments(e);}} className="title-h2">
                {data.title}
              </h2>
            </div>

            <div className="asignee-container">
              <img
                className="avatar-image"
                src={data.assignee !=null  ? data.assignee.avatar_url : image}
                alt="Not found"
              />
              <h3>{data.assignee != null ? data.assignee.login : <p className='missing-assignee-alert'>This issue has no assignee</p>}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IssuesList;
