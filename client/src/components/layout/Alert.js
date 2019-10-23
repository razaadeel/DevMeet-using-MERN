import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.alert !== null
                    &&
                    this.props.alert.length > 0
                    &&
                    this.props.alert.map(alert => {
                        return (
                            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                                {alert.msg}
                            </div>
                        )

                    }
                    )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        alert: state.alert
    }
)

export default connect(mapStateToProps, null)(Alert);
