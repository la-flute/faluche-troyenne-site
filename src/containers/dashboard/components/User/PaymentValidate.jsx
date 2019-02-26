import React from 'react'
import ian from '../../../../assets/ian-valid.jpg'

class PaymentValidate extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1 align='center' style={{ color: 'green', fontSize: '60px' }}>
          Paiement validé !
        </h1>
        <img src={ian} alt='' style={{ width: '70%', maxWidth: '500px' }} />
      </div>
    )
  }
}


export default PaymentValidate