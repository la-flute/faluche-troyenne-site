import React from 'react'
import { Card, Skeleton, Icon } from 'antd'
const { Meta } = Card

class View extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{ width: '30%', minWidth: '300px' }}
          bordered
          loading
          cover={
            <img
              alt='example'
              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            />
          }
          actions={[
            <Icon type='like' style={{ color: 'green' }} onClick={()=>console.log('click')}/>,
            <Icon type='star' style={{ color: 'blue' }} />,
            <Icon type='dislike' style={{ color: 'red' }} />
          ]}
        >
          <Skeleton loading={false} avatar active>
            <Meta title='Arnaud "Judas"' />
          </Skeleton>
        </Card>
      </div>
    )
  }
}

export default View
