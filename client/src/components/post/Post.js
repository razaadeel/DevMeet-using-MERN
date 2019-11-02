import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../store/action/postAction';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export class Post extends Component {

    componentDidMount({ getPost, match } = this.props) {
        getPost(match.params.id)
    }

    render() {
        const { post: { post, loading } } = this.props;
        return loading || post === null ?
            < Spinner />
            :
            <Fragment>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className='comments'>
                    {
                        post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        ))
                    }
                </div>
            </Fragment>
    }
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
