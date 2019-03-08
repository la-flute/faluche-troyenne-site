import React from 'react'
import { Card, Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { fetchTargets, target, notTarget } from '../../../../modules/target'
const { Meta } = Card

class View extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTargets()
  }

  render() {
    const { targets } = this.props
    const loaded = targets.length > 0
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{ width: '30%', minWidth: '300px' }}
          bordered
          loading={!loaded}
          cover={
            <img
              alt='example'
              src={
                loaded && targets[0].image
                  ? `${process.env.REACT_APP_API}/tinders/${
                      targets[0].id
                    }/image`
                  : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/6a85aead-6cad-4934-9b67-6922679ef1fe/dczq86p-69984e0c-6ead-44e8-aa97-c3fc30b8213b.jpg/v1/fill/w_759,h_1052,q_70,strp/leia_on_tatooine_by_warpdrivegfx_dczq86p-pre.jpg'
              }
            />
          }
          actions={[
            <Tooltip placement='top' title='Plier cette personne'>
              <Icon
                type='stop'
                style={{ color: loaded ? 'red' : 'gray' }}
                onClick={() => {
                  if (loaded) this.props.target(targets[0].id)
                }}
              />
            </Tooltip>,
            <Tooltip placement='top' title='Ignorer cette personne'>
              <Icon
                type='right-square'
                style={{ color: loaded ? 'blue' : 'gray' }}
                onClick={() => {
                  if (loaded) this.props.notTarget(targets[0].id)
                }}
              />
            </Tooltip>
          ]}
        >
          {targets[0] && (
            <Meta
              title={`${targets[0].firstName}${
                targets[0].nickName ? ' "' + targets[0].nickName + '"' : ''
              }`}
              description={targets[0].town}
            />
          )}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  targets: state.target.targets
})

const mapDispatchToProps = dispatch => ({
  fetchTargets: () => dispatch(fetchTargets()),
  target: id => dispatch(target(id)),
  notTarget: id => dispatch(notTarget(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
