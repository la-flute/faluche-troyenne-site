import React from 'react'
import { Table, Spin } from 'antd'
import { fetchUser } from '../../../../modules/user'
import { connect } from 'react-redux'

class Infos extends React.Component {
  translate = word => {
    switch (word) {
      case 'nickName':
        return 'Surnom'
      case 'firstName':
        return 'Prénom'
      case 'lastName':
        return 'Nom'
      case 'email':
        return 'Mail'
      case 'town':
        return "Ville d'Étude"
      case 'studies':
        return 'Études'
      case 'phone':
        return 'Téléphone'
      case 'address':
        return 'Adresse'
      case 'isMajeur':
        return 'Majeur'
      case 'folklore':
        return 'Folklore'
      case 'faluchard':
        return 'Faluchard'
      case 'autre':
        return 'Autre'
      case 'impetrant':
        return 'Impétrant'
      case 'sympathisant':
        return 'Sympathisant'
      case 'trajet':
        return 'Trajet'
      case 'trajet_commentaire':
        return 'Commentaire'
      case 'referent_lastName':
        return 'Nom du référent extérieur'
      case 'referent_firstName':
        return 'Prénom du référent extérieur'
      case 'referent_phone':
        return 'Téléphone du référent extérieur'
      case 'referent':
        return 'Référent Faluchard'
      case 'allergies':
        return 'Allergies'
      case 'car':
        return 'Voiture'
      case 'train':
        return 'Train'
      case 'vege':
        return 'Végétarien'
      case 'vegan':
        return 'Végan'
      case 'omni':
        return 'Omnivore'
      default:
        return word
    }
  }
  render() {
    const { user } = this.props
    if (!user) {
      this.props.fetchUser()
      return <Spin />
    }
    console.log(user)
    const dataSource = Object.keys(user)
      .filter(
        i =>
          i !== 'id' &&
          i !== 'permission' &&
          i !== 'bedroomId' &&
          i !== 'teamId' &&
          user[i]
      )
      .map(i => {
        const field = this.translate(i)
        if (!field) return null
        return {
          key: i,
          field,
          value: user[i] === true ? 'oui' : this.translate(user[i])
        }
      })

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

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 50, position: 'none' }}
      />
    )
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
