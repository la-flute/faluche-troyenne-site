import React from 'react'
import { Table, Spin } from 'antd'
import { fetchUser } from '../../../../modules/user'
import { connect } from 'react-redux'

class Infos extends React.Component {
  render() {
    const { user } = this.props
    if (!user) {
      this.props.fetchUser()
      return <Spin />
    }

    console.log(user)

    const dataSource = []

    const columns = [
      {
        title: 'Informations',
        dataIndex: 'field',
        key: 'field'
      },
      {
        title: '',
        dataIndex: 'value',
        key: 'value'
      }
    ]

    return <Table dataSource={dataSource} columns={columns} />
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Infos)
