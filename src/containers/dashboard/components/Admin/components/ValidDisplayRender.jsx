import React from 'react'

import { connect } from 'react-redux'

import { Button, Spin, Modal, Tooltip } from 'antd'

import {
    getDisplays,
    enableDisplay,
    disableDisplay,
} from '../../../../../modules/displays'

const confirm = Modal.confirm

class ValidUser extends React.Component {
    showConfirm = (title, content, callback) => {
        confirm({
            title,
            content,
            onOk() {
                callback()
            },
            onCancel() {},
        })
    }

    render() {
        const { code, render } = this.props
        if (!code) {
            return <Spin />
        }
        return (
            <React.Fragment>
                {/* ELEMENT PAS AFFICHÉ */}
                {code && !render && (
                    <Tooltip placement='right' title='Afficher'>
                        <Button
                            type='primary'
                            onClick={() =>
                                this.showConfirm(
                                    'Afficher cet élément ?',
                                    `Cela le rendra accessible à tous les utilisateurs. Fais pas l'con Philippe !`,
                                    () => this.props.enableDisplay(code)
                                )
                            }
                        >
                            Afficher
                        </Button>
                    </Tooltip>
                )}

                {/* ELEMENT AFFICHÉ */}
                {code && render && (
                    <Tooltip placement='right' title='Ne plus afficher'>
                        <Button
                            type='primary'
                            onClick={() =>
                                this.showConfirm(
                                    'Ne plus afficher cet élément ?',
                                    `Cela le rendra inutilisable pour tous les utilisateurs. Fais pas l'con Philippe !`,
                                    () => this.props.disableDisplay(code)
                                )
                            }
                        >
                            Ne plus afficher
                        </Button>
                    </Tooltip>
                )}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getDisplays: () => dispatch(getDisplays()),
    enableDisplay: code => dispatch(enableDisplay(code)),
    disableDisplay: code => dispatch(disableDisplay(code)),
})

export default connect(
    null,
    mapDispatchToProps
)(ValidUser)
