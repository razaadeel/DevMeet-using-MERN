import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../store/action/profileAction';
import ProfileEducation from './ProfileEducation';

export class Profile extends Component {

    componentDidMount({ getProfileById, match } = this.props) {
        getProfileById(match.params.id);
    }

    render() {
        const { profile: { profile, loading }, auth } = this.props;
        return (
            <Fragment>
                {
                    profile === null || loading ? <Spinner />
                        :
                        <Fragment>
                            <Link to='/profiles' className='btn btn-light'>
                                Back To Profiles
                            </Link>
                            {
                                auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id ?
                                    <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
                                    :
                                    null
                            }
                            <div className='profile-grid my-1'>
                                <ProfileTop profile={profile} />
                                <ProfileAbout profile={profile} />
                                <div className="profile-exp bg-white p-2">
                                    <h2 className="text-primary">Experience</h2>
                                    {
                                        profile.experience.length > 0 ?
                                            (
                                                <Fragment>
                                                    {
                                                        profile.experience.map(experience => (
                                                            <ProfileExperience key={experience._id} experience={experience} />
                                                        ))
                                                    }
                                                </Fragment>
                                            )
                                            :
                                            <h4>No Experience</h4>
                                    }
                                </div>
                                <div className="profile-edu bg-white p-2">
                                    <h2 className="text-primary">Education</h2>

                                    {
                                        profile.education.length > 0 ?
                                            (
                                                <Fragment>
                                                    {
                                                        profile.education.map(education => (
                                                            <ProfileEducation key={education._id} education={education} />
                                                        ))
                                                    }
                                                </Fragment>
                                            )
                                            :
                                            <h4>No Education</h4>
                                    }
                                </div>
                                {
                                    profile.githubusername && <ProfileGithub username={profile.githubusername} />
                                }
                            </div>
                        </Fragment>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
