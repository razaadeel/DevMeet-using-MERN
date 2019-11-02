import React, { Component } from 'react';
import Moment from 'react-moment'

export class ProfileEducation extends Component {
    render() {
        const { school, degree, fieldofofstudy, to, from, description } = this.props.education ;
        return (
            <div>
                <h3 className='text-dark'> {school} </h3>
                <p>
                    <Moment format='DD/MM/YYYY'>{from}</Moment> - {to ? <Moment format='DD/MM/YYYY'>{to}</Moment> : 'Present'}
                </p>
                <p>
                    <strong>Degree: </strong> {degree}
                </p>
                <p>
                    <strong>Field of Study: </strong> {fieldofofstudy}
                </p>
                <p>
                    <strong>Description: </strong> {description}
                </p>
            </div>
        )
    }
}

export default ProfileEducation
