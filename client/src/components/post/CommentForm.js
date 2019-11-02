import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../store/action/postAction';


export class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }
    render() {
        const { addComment, postId } = this.props;
        const text = this.state.text;
        return (
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave a comment...</h3>
                </div>
                <form className="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addComment(postId, { text });
                    this.setState({ text: '' })
                }}>
                    <textarea
                        value={this.state.text}
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        onChange={e => this.setState({ text: e.target.value })}
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        )
    }
}

export default connect(null, { addComment })(CommentForm);
