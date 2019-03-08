import React from 'react'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'

class AdminConfig extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AdminBar title={`Panneau d'administration`} />
            </React.Fragment>
        )
    }
}

// const mapStateToProps = state => ({
//     display: state.admin.display
// })

// const mapDispatchToProps = dispatch => ({
//     fetchDisplays: () => dispatch(fetchDisplays())
// })

export default connect()(AdminConfig)
// mapStateToProps,
// mapDispatchToProps