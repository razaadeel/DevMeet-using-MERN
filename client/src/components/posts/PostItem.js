import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../store/action/postAction';

export class PostItem extends Component {
    render() {
        const { auth,
            post: { _id, text, name, avatar, user, likes, comments, date },
            addLike,
            removeLike,
            deletePost,
            showActions
        } = this.props;
        return (
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1"> {text} </p>
                    <p className="post-date">Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>

                    {
                        showActions && <Fragment>
                            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i> {' '}
                                <span>{likes.length > 0 && <span>{likes.length}</span>}
                                </span>
                            </button>
                            <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i> {' '}
                            </button>
                            <Link to={`/posts/${_id}`} className="btn btn-primary">
                                Discussion {' '}
                        {
                                    comments.length > 0 && (
                                        <span className='comment-count'>{comments.length}</span>
                                    ) 
                                }
                            </Link>
                            {
                                !auth.loading && user === auth.user._id && (
                                    <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                                        <i className="fas fa-times"></i>
                                    </button>

                                )
                            }
                        </Fragment>
                    }

                </div>
            </div>

        )
    }
}

PostItem.defaultProps = {
    showActions: true
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
