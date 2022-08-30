import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import Posts from "../posts/Posts";

// Sorting function by date
function dateSort(o1, o2) {
  if (o1.date < o2.date) {
    return -1;
  } else if (o1.date > o2.date) {
    return 1;
  } else {
    return 0;
  }
}

// Transforms comment object into CommentItems and sorts
function commentLoader(comments, _id) {
  comments.sort(dateSort);
  return comments.map((comment) => (
    <CommentItem key={comment._id} comment={comment} postId={_id} />
  ));
}

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id} />
      <div className="comments">{commentLoader(post.comments, post._id)}</div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
