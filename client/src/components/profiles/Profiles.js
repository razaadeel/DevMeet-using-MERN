import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../store/action/profileAction';

export class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profile: { profiles, loading } } = this.props;
        return (
            <Fragment>
                {
                    loading ?
                        <Spinner />
                        :
                        <Fragment>
                            <h1 className='large text-primary'>Developers</h1>
                            <p className='lead'>
                                <i className='fab fa-connectdevelop'></i>Browse and Connect with Developer
                            </p>
                            <div className='profiles'>
                                {
                                    profiles.length > 0 ?
                                        (
                                            profiles.map(profile => (
                                                <ProfileItem key={profile._id} profile={profile} />
                                            ))
                                        )
                                        :
                                        <h4>No Profiles found...</h4>
                                }
                            </div>
                        </Fragment>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
