import React from 'react'
import { Spring, Transition, config as springConfig } from 'react-spring'

export default class StandaloneRender {

	proportion = 1
	imageStyle = {}
	placeholderImageStyle = {}

    constructor(props) {
		const { width, height } = props
		const blur = props.blur || 0

		if (width && height) {
			const imageStyleBase = (w,h) => ({
				width: w + 'px',
				height: h + 'px',
				maxWidth: w + 'px'
			})
			this.imageStyle = imageStyleBase(width, height)
			this.placeholderImageStyle = imageStyleBase(width - blur, height - blur)
			this.proportion = width / height
		} else {
			const imageStyleFull = {
				width: '100%',
				height: '100%'
			}
			this.imageStyle = imageStyleFull
			this.placeholderImageStyle = imageStyleFull
		}
    }

    fillStyle (props = {}) {
		let edge = (props.blur || 0) / 2
		return {
	    	position: 'absolute',
	    	width: props.width || '100%',
	    	height: props.height || '100%',
	    	paddingLeft: edge,
	    	paddingTop: edge,
		}
    }

    run(state, props) {
        const { width, height, src, placeholderSrc } = props
		const blur = props.blur || 0
        const blurFilter = 'blur(' + blur + 'px)'

        return <div style={{
            width, height, padding: 0
        }}>

            <Spring config={ springConfig.slow }
                from={{ opacity: 0, filter: blurFilter }}
                to={ state.imageLoaded
                    ? { opacity: 1, filter: 'blur(0px)' }
                    : { opacity: 1, filter: blurFilter }
                }>
                { styles => { return placeholderSrc
                    ? <div style={this.fillStyle(props)}>
                        <img src={placeholderSrc}
                            style={{
                                ...styles,
                                ...this.placeholderImageStyle
                            }} />
                    </div>
                    : <div style={this.fillStyle(props)}>Loading</div>
                }}
            </Spring>

            <Spring from={{ opacity: 0 }}
                to={ state.imageLoaded
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }>
                { styles => <div style={this.fillStyle()}>
                        <img src={src}
                            style={{
                                ...styles,
                                ...this.imageStyle
                            }} />
                    </div>
                }
            </Spring>

        </div>
    }
}
