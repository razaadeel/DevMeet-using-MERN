import React, { Component } from 'react';
import Moment from 'react-moment'

export class ProfileExperience extends Component {
    render() {
        const { company, title, to, from, description } = this.props.experience;
        return (
            <div>
                <h3 className='text-dark'> {company} </h3>
                <p>
                    <Moment format='DD/MM/YYYY'>{from}</Moment> - {to ? <Moment format='DD/MM/YYYY'>{to}</Moment> : 'Present'}
                </p>
                <p>
                    <strong>Position: </strong> {title}
                </p>
                <p>
                    <strong>Description: </strong> {description}
                </p>
            </div>
        )
    }
}

export default ProfileExperience
