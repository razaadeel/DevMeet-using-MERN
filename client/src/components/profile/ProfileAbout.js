import React, { Component, Fragment } from 'react'

export class ProfileAbout extends Component {
    render() {
        const {
            bio,
            skills,
            user: { name }
        } = this.props.profile
        return (
            <div className="profile-about bg-light p-2">
                {
                    bio && (
                        <Fragment>
                            <h2 className="text-primary">{name}'s Bio</h2>
                            <p>{bio}</p>
                            <div className="line"></div>
                        </Fragment>
                    )
                }
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {
                        skills.map((skill, index) => (

                            <div className="p-1" key={index}><i className="fa fa-check"></i> {skill} </div>
                        ))
                    }
                    
                </div>
            </div>
        )
    }
}

export default ProfileAbout
