import React from 'react'
import vader from '../../../../assets/vaderno.jpg'

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
        <h1 align='center' style={{ color: 'red', fontSize: '50px' }}>
          Une erreur est survenue lors du paiement
        </h1>
        <img src={vader} alt='' style={{ width: '100%', maxWidth: '900px' }} />
      </div>
    )
  }
}


export default PaymentValidate