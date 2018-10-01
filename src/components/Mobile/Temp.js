import React, { Component } from 'react'
import Camera from '../Camera'

class Temp extends Component {
    render () {
        return <div style={{
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
                overflowX: 'hidden',
                margin: 0
            }}>
            <Camera />
        </div>
    }
}
export default Temp
