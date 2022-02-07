import React, { useState } from 'react';

import FormComponent from './components/FormComponent';
import CommentsBox from './components/CommentsBox';
import IssuesList from './components/IssuesList';

import "./App.scss";

function App() {
  const [route, setRoute] = useState(localStorage.getItem("routing"));
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [comments, setComments] = useState();

  // Function for changing routes
  let onRouteChange = (route) => {
    if (route === "clear") {
      localStorage.setItem("routing", "clear");
      localStorage.setItem("isSignedIn", false);
      localStorage.removeItem("username");
      localStorage.removeItem("reponame");
    } else if (route === "issues") {
      localStorage.setItem("routing", "issues");
      localStorage.setItem("isSignedIn", true);
    }
    setRoute(route);
  };

  // Save username and reponame to localStorage
  let userInfo = (username, reponame) => {
    localStorage.setItem("username", username);
    localStorage.setItem("reponame", reponame);
  };

  //Toggle the comment box
  let toggleCommentBox = (isOpen) => {
    setIsOpenBox(isOpen);
  };

  // Function for setting the comments by useState comments hook
  let getComments = (comments) => {
    setComments(comments);
  };

  return (
    <div className="App">
      {route === "issues" ? (
        <>
          {isOpenBox ? (
            <>
              <CommentsBox
                toggleCommentBox={toggleCommentBox}
                comments={comments}
              />
            </>
          ) : (
            <IssuesList
              getComments={getComments}
              toggleCommentBox={toggleCommentBox}
              onRouteChange={onRouteChange}
              userInfo={userInfo}
            />
          )}
        </>
      ) : (
        <FormComponent onRouteChange={onRouteChange} userInfo={userInfo} />
      )}
    </div>
  );
}

export default App;