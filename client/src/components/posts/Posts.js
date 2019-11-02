import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../store/action/postAction';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

export class Posts extends Component {

    componentDidMount({ getPosts } = this.props) {
        getPosts();
    }

    render({ post: { posts, loading } } = this.props) {
        return (
            loading ?
                <Spinner />
                :
                <Fragment>
                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'>
                        <i className='fas fa-user'> Welcome to the Communiity</i>
                    </p>
                    <PostForm/>    
                    <div className='posts'>
                        {
                            posts.map(post => (
                                <PostItem key={post._id} post={post}/>
                            ))
                        }
                    </div>
                </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
