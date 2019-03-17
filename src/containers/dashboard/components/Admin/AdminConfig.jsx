import React from 'react'
import { connect } from 'react-redux'
import { getDisplays, enableDisplay } from '../../../../modules/displays'

import AdminBar from './AdminBar'
import { List } from 'antd'
import ValidDisplayRender from './components/ValidDisplayRender'

class AdminConfig extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDisplays()
    }

    enableDisplay = code => {
        console.log(code)
    }

    disableDisplay = () => {
        console.log('ne plus afficher')
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <AdminBar title={`Panneau d'administration`} />
                <List
                    itemLayout='horizontal'
                    dataSource={this.props.displays}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <ValidDisplayRender
                                    code={item.code}
                                    render={item.render}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                title={`${item.code}`}
                                description={`La seule et unique ${
                                    item.name
                                } créée par Fleuh et Arnaud pour amuser les trous du cul`}
                            />
                        </List.Item>
                    )}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    displays: state.displays.displays,
})

const mapDispatchToProps = dispatch => ({
    getDisplays: () => dispatch(getDisplays()),
    enableDisplay: code => dispatch(enableDisplay(code)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminConfig)
