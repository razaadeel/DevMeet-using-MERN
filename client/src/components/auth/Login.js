import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../store/action/authAction';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    getValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Fragment>
                <h1 className="large text-primary">Sign In</h1>

                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>

                <form className="form" onSubmit={this.onSubmit.bind(this)}>

                    <div className="form-group">
                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.getValue.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.getValue.bind(this)}
                        />
                    </div>


                    <input type="submit" className="btn btn-primary" value="Login" />

                </form>

                <p className='my-1'>
                    Don't have an account?
                    <Link to="/register"> Register</Link>
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

export default connect(mapStateToProps, { login })(Login);
