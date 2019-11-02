import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../store/action/postAction';


export class CommentItem extends Component {
    render() {
        const { comment: { _id, text, name, avatar, user, date }, auth, postId, deleteComment } = this.props;
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
                    <p className="my-1">{text}</p>
                    <p className="post-date">Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
                    {
                        !auth.loadin && user === auth.user._id && (
                            <button onClick={e => { deleteComment(postId, _id) }} className='btn btn-danger'>
                                <i className='fa fa-times'></i>
                            </button>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);
