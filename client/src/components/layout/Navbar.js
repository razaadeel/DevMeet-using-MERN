import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/action/authAction';

class Navbar extends React.Component {
    render() {

        return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>

                {
                    !this.props.isAuthenticated ?
                        <ul>
                            <li>
                                <Link to="!#">
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    <i className="fas fa-user">{'  '}</i>
                                    <span className="hide-sm"> Dashboard </span>
                                </Link>
                            </li>
                            <li>
                                <a onClick={this.props.logout} href="#!">
                                    <i className="fas fa-sign-out-alt">{' '}
                                        <span className="hide-sm">Logout</span>
                                    </i>
                                </a>
                            </li>
                        </ul>

                }


            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Navbar);
