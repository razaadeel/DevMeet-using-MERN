import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost } from '../../store/action/postAction';

export class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }



    }
    render() {
        const { addPost } = this.props;
        const text = this.state.text;
        return (
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addPost({ text });
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

export default connect(null, { addPost })(PostForm);
