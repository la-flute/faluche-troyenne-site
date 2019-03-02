import React from 'react'
import { Card, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  fetchTinders,
  like,
  turbolike,
  dislike
} from '../../../../modules/tinder'
const { Meta } = Card

class View extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTinders()
  }

  render() {
    const { tinders, users } = this.props
    const loaded = tinders.length > 0
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
                loaded
                  ? `${process.env.REACT_APP_API}/tinders/${
                      tinders[0].id
                    }/image`
                  : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/6a85aead-6cad-4934-9b67-6922679ef1fe/dczq86p-69984e0c-6ead-44e8-aa97-c3fc30b8213b.jpg/v1/fill/w_759,h_1052,q_70,strp/leia_on_tatooine_by_warpdrivegfx_dczq86p-pre.jpg'
              }
            />
          }
          actions={[
            <Icon
              type='like'
              style={{ color: loaded ? 'green' : 'gray' }}
              onClick={() => {
                if (loaded) this.props.like(tinders[0].id)
              }}
            />,
            <Icon
              type='star'
              style={{ color: loaded ? 'blue' : 'gray' }}
              onClick={() => {
                if (loaded) this.props.turbolike(tinders[0].id)
              }}
            />,
            <Icon
              type='dislike'
              style={{ color: loaded ? 'red' : 'gray' }}
              onClick={() => {
                if (loaded) this.props.dislike(tinders[0].id)
              }}
            />
          ]}
        >
          {tinders[0] && (
            <Meta
              title={`${tinders[0].firstName}${
                tinders[0].nickName ? ' "' + tinders[0].nickName + '"' : ''
              }`}
              description={tinders[0].catchphrase}
            />
          )}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  tinders: state.tinder.tinders
})

const mapDispatchToProps = dispatch => ({
  fetchTinders: () => dispatch(fetchTinders()),
  like: id => dispatch(like(id)),
  dislike: id => dispatch(dislike(id)),
  turbolike: id => dispatch(turbolike(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
