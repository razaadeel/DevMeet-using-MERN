import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import {  withRouter, Link } from 'react-router-dom';
import { createProfile } from '../../store/action/profileAction';


class CreateProfile extends Component {
    constructor() {
        super();
        this.state = {
            company: '',
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            socialInputes: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        const formData = {
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        e.preventDefault();
        this.props.createProfile(formData, this.props.history);
    }

    render() {
        return (
            <Fragment>
                <h1 className="large text-primary">
                    Create Your Profile
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i>
                    Let's get some information to make your profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <select name="status" value={this.state.status} onChange={this.onChange.bind(this)}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">
                            Give us an idea of where you are at in your career
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={this.state.company} onChange={this.onChange.bind(this)} />
                        <small className="form-text">
                            Could be your own company or one you work for
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Website" name="website" value={this.state.website} onChange={this.onChange.bind(this)} />
                        <small className="form-text">
                            Could be your own or a company website
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={this.state.location} onChange={this.onChange.bind(this)} />
                        <small className="form-text">
                            City & state suggested (eg. Boston, MA)
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={this.state.skills} onChange={this.onChange.bind(this)} />
                        <small className="form-text">
                            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername} onChange={this.onChange.bind(this)}
                        />
                        <small className="form-text">
                            If you want your latest repos and a Github link, include your username
                        </small>
                    </div>
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" value={this.state.bio} onChange={this.onChange.bind(this)}>
                        </textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={() => this.setState({ socialInputes: !this.state.socialInputes })}>
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>
                    {
                        this.state.socialInputes ?
                            <Fragment>
                                <div className="form-group social-input">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <input type="text" placeholder="Twitter URL" name="twitter" value={this.state.twitter} onChange={this.onChange.bind(this)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"></i>
                                    <input type="text" placeholder="Facebook URL" name="facebook" value={this.state.facebook} onChange={this.onChange.bind(this)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-youtube fa-2x"></i>
                                    <input type="text" placeholder="YouTube URL" name="youtube" value={this.state.youtube} onChange={this.onChange.bind(this)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={this.state.linkedin} onChange={this.onChange.bind(this)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <input type="text" placeholder="Instagram URL" name="instagram" value={this.state.instagram} onChange={this.onChange.bind(this)} />
                                </div>
                            </Fragment>
                            :
                            null
                    }

                    <input type="submit" value='Submitٖ' className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </Fragment>
        )
    }
}


export default connect(null, { createProfile })(withRouter(CreateProfile));