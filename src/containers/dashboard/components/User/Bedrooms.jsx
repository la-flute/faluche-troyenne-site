import React from 'react'
import { List, Button, Collapse, Spin, Divider } from 'antd'
import { connect } from 'react-redux'
import {
  fetchBedrooms,
  joinBedroom,
  leaveBedroom
} from '../../../../modules/bedrooms'

const Panel = Collapse.Panel

class Bedrooms extends React.Component {
  render() {
    let { bedrooms, user } = this.props
    if (!bedrooms || !user) {
      this.props.fetchBedrooms()
      return <Spin />
    }
    bedrooms = bedrooms.sort((a, b) => {
      if (a.number > b.number) return 1
      if (a.number < b.number) return -1
      return 0
    })
    return (
      <div>
        <h1>Liste des chambres</h1>
        {bedrooms.length > 0 ? (
          <Collapse>
            {bedrooms.map(bedroom => {
              let used = bedroom.users.length
              let full = false
              let usage = ''
              if (bedroom.places - used <= 0) {
                usage = 'Chambre pleine'
                full = true
              } else usage = `${used}/${bedroom.places} places`
              return (
                <Panel
                  header={
                    <span
                      style={{ color: full ? 'red' : 'green' }}
                    >{`Chambre n°${bedroom.number} (${usage})`}</span>
                  }
                  key={bedroom.id}
                >
                  <List
                    itemLayout='horizontal'
                    dataSource={bedroom.users}
                    locale={{ emptyText: 'Cette chambre est vide' }}
                    renderItem={item => (
                      <span>{`${item.lastName}. ${item.firstName} ${
                        item.nickName ? item.nickName : ''
                      }`}</span>
                    )}
                  />
                  {!full &&
                    !user.bedroomId &&
                    user.order &&
                    user.order.bedroom && <Divider />}
                  {!full &&
                    !user.bedroomId &&
                    user.order &&
                    user.order.bedroom && (
                      <Button
                        type='primary'
                        onClick={() => this.props.joinBedroom(bedroom.id)}
                      >
                        Rejoindre cette chambre
                      </Button>
                    )}
                  {user.bedroomId && bedroom.id === user.bedroomId && (
                    <Divider />
                  )}
                  {user.bedroomId && bedroom.id === user.bedroomId && (
                    <Button
                      type='danger'
                      onClick={() => this.props.leaveBedroom(bedroom.id)}
                    >
                      Quitter cette chambre
                    </Button>
                  )}
                </Panel>
              )
            })}
          </Collapse>
        ) : (
          <Spin />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  bedrooms: state.bedrooms.bedrooms,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchBedrooms: () => dispatch(fetchBedrooms()),
  joinBedroom: id => dispatch(joinBedroom(id)),
  leaveBedroom: id => dispatch(leaveBedroom(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bedrooms)
