import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Canvas extends Component {
    ref = null

    constructor (props) {
        super(props)
    }

    componentDidMount() {
        const { context, width, height } = this.props
        console.log(width, height)
        if ( context == null ) {
            console.log(this.ref)
            const _canvas = this.ref
            _canvas.width = width
            _canvas.height = height
            const ctx = _canvas.getContext('2d')
        	ctx.strokeStyle = 'aliceblue'
        	ctx.fillStyle = '#00000f'
        	ctx.lineWidth = 5
        	ctx.lineJoin = 'round'
        	ctx.lineCap = 'round'
        }
    }

    clearCanvas() {
        const _canvas = this.ref
        const _context = _canvas.getContext('2d')
        _context.clearRect(0, 0, _canvas.width, _canvas.height)
    }

    drawRectangle(rect) {
        let { x0, y0, x1, y1 } = rect
        const ctx = this.ref.getContext('2d')

		ctx.beginPath()
		ctx.moveTo(x0,y0)
		ctx.lineTo(x1,y0)
		ctx.lineTo(x1,y1)
		ctx.lineTo(x0,y1)
		ctx.lineTo(x0,y0)
		ctx.stroke()
		ctx.closePath()
    }

    render () {
        let { rectangles } = this.props

        if (this.ref) {
            this.clearCanvas()
            if (rectangles.length) {
                rectangles.forEach( rect => this.drawRectangle(rect) )
            } else {
                this.clearCanvas()
            }
        }

        return <canvas ref={ ref => { this.ref = ref } }
            style={this.props.style}
        />
    }
}

export default Canvas
