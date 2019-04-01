import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchCounts } from '../../../../modules/admin'

class AdminBar extends React.Component {
  constructor(props){
    super(props)
    this.props.fetchCounts()
  }
  render() {
    return (
      <React.Fragment>
        <Card title={<h1>{this.props.title}</h1>}>
          <p>
            <i>"Un grand pouvoir implique de grandes responsabilités"</i>
            <strong> Oncle Ben</strong>
          </p>
          <p>
            Alors <strong>fais gaffe à ce que tu fais !</strong>
          </p>
        </Card>
        {this.props.counts && (
          <Card title={<h1>Stats</h1>}>
            {Object.entries(this.props.counts).map(c => (
              <p>
                <strong>{c[0]} : </strong>
                {c[1]}
              </p>
            ))}
          </Card>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  counts: state.admin.counts
})

const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home')),
  fetchCounts: () => dispatch(fetchCounts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBar)
