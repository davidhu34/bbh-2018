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

    limitX(x) {
        const { width } = this.props
        return Math.max( Math.min(width,x), 0 )
    }
    limitY(y) {
        const { height } = this.props
        return Math.max( Math.min(height,y), 0 )
    }
    drawRectangle(rect) {
        const x1 = this.limitX(rect.x1)
        const y1 = this.limitY(rect.y1)
        const x2 = this.limitX(rect.x2)
        const y2 = this.limitY(rect.y2)
        const ctx = this.ref.getContext('2d')

		ctx.beginPath()
		ctx.moveTo(x1,y1)
		ctx.lineTo(x2,y1)
		ctx.lineTo(x2,y2)
		ctx.lineTo(x1,y2)
		ctx.lineTo(x1,y1)
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
