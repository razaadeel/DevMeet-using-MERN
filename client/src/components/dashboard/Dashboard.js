import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../store/action/profileAction';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DasboardAcitons from './DashboardActions';
import Experience from './Experience';
import Education from './Education';



class Dashboard extends React.Component {

    render() {
        const { auth: { user }, profile: { profile, loading } } = this.props;
        return (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user">Welcome {user && user.name}</i>
                </p>
                {
                    profile === null ?
                        !loading ?
                            <Fragment>
                                <p>You have not yet setup a profile, please add some info</p>
                                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                            </Fragment>
                            :
                            <Spinner />
                        :
                        <Fragment>
                            <DasboardAcitons/>
                            <Experience experience={profile.experience}/>
                            <Education education={profile.education}/>
                        </Fragment>

                }
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);