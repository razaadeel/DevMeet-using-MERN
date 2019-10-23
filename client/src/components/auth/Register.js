import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../store/action/alertAction';
import { register } from '../../store/action/authAction';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    getValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.password2) {
            this.props.setAlert('Password donot match', 'danger')
        }
        else {
            const { name, email, password } = this.state;
            this.props.register({ name, email, password });
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Fragment>
                <h1 className="large text-primary">Sign Up</h1>

                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

                <form className="form" onSubmit={this.onSubmit.bind(this)}>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            // required
                            value={this.state.name}
                            onChange={this.getValue.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.getValue.bind(this)}
                        />

                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                    </small>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            //minLength="6"
                            value={this.state.password}
                            onChange={this.getValue.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            // minLength="6"
                            value={this.state.password2}
                            onChange={this.getValue.bind(this)}
                        />

                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />

                </form>

                <p className="my-1">
                    Already have an account? <Link to="/login"> Sign In</Link>
                </p>
            </Fragment>
        )
    }

}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated
    }
);

export default connect(mapStateToProps, { setAlert, register })(Register);
