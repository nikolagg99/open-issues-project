import React, { useEffect, useRef, useState } from 'react';
import NoCommentsAlert from './NoCommentsAlert';
import './style/CommentsBox.scss';

const CommentsBox = (props) => {
  const [comments, setComments] = useState();

  // creating componentMounted refference(helps to unmount
  // the component when closing comment component)
  const componenetMounted = useRef(true);

  // Hide comment box
  let hideComments = () => {
    props.toggleCommentBox(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = props.comments;
        const response = await fetch(url.toString());
        const result = await response.json();
        setComments(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    // Fetch data when component is mounted
    if (componenetMounted.current) {
      fetchData();
    }

    // When component is unmounted - set refferrence to false
    return () => {
      componenetMounted.current = false;
    };
  });

  return (
    <div className="comments-container">
      <button className="close-commnets-button" onClick={hideComments}>
        Close all comments
      </button>

      {comments !== undefined && comments.length !== 0 ? (
        comments.map((data) => {
          return (
            <div key={data.id} className="single-comment">
              <div className="comment-items asignee">
                <img
                  className="avatar-image-comment"
                  src={data.user.avatar_url}
                  alt="Not found"
                />
                <h4>{data.user.login}</h4>
              </div>

              <div className="comment-items comment">
                <p className="comment-text">{data.body}</p>
              </div>
            </div>
          );
        })
      ) : (
        <NoCommentsAlert />
      )}
    </div>
  );
};

export default CommentsBox;
