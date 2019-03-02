import React from 'react'
import { connect } from 'react-redux'
import { Tabs, List, Avatar, Icon } from 'antd'
import { fetchTopTinders, fetchTinderUsers } from '../../../../modules/tinder'
const { TabPane } = Tabs
class TopTinder extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTopTinders()
    this.props.fetchTinderUsers()
  }
  render() {
    let { mostLiked, mostTurboLiked, users } = this.props
    let loading = false
    if (!mostLiked || !mostTurboLiked || !users) loading = true

    mostLiked = mostLiked.map(liked => {
      let user = users.find(u => u.id === liked.id)
      return { ...liked, ...user }
    })
    mostTurboLiked = mostTurboLiked.map(liked => {
      let user = users.find(u => u.id === liked.id)
      return { ...liked, ...user }
    })
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>Top Tinder</h1>
        <Tabs defaultActiveKey='like'>
          <TabPane
            tab={
              <span>
                Like <Icon type='like' style={{ color: 'green' }} />
              </span>
            }
            key='like'
          >
            <List
              loading={loading}
              itemLayout='horizontal'
              dataSource={mostLiked}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`${process.env.REACT_APP_API}/tinders/${
                          item.id
                        }/image`}
                      />
                    }
                    title={item.firstName}
                    description={item.catchphrase}
                  />
                  <div>{item.number} likes</div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                Turbolike <Icon type='star' style={{ color: 'blue' }} />
              </span>
            }
            key='turbolike'
          >
            <List
              loading={loading}
              itemLayout='horizontal'
              dataSource={mostTurboLiked}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`${process.env.REACT_APP_API}/tinders/${
                          item.id
                        }/image`}
                      />
                    }
                    title={item.firstName}
                    description={item.catchphrase}
                  />
                  <div>{item.number} turbolikes</div>
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  mostLiked: state.tinder.mostLiked,
  mostTurboLiked: state.tinder.mostTurboLiked,
  users: state.tinder.users
})

const mapDispatchToProps = dispatch => ({
  fetchTopTinders: () => dispatch(fetchTopTinders()),
  fetchTinderUsers: () => dispatch(fetchTinderUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopTinder)
