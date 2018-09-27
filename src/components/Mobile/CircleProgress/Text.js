import React from 'react'

const Text = ({ size, title, value, unit }) => {
    let width = (size || 100) + 'px'
    let height = width
    return <div style={{
        position: 'absolute',
        width,
        height,
    }}>
        {title || ''}
        <br />
        {value || ''}
        <br />
        {unit || ''}
    </div>
}
export default Text
