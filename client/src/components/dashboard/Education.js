import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../store/action/profileAction';

class Education extends Component {
    render() {
        const { education, deleteEducation } = this.props;
        const educations = education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? ('Present') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </td>
                <td>
                    <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ))
        return (
            <Fragment>
                <h2 className="my-2">Education</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Institute</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {educations}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default connect(null, { deleteEducation })(Education);