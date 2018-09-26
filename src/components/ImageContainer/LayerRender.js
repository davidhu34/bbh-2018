import React from 'react'
import { Spring, Transition, config as springConfig } from 'react-spring'

export default class LayerRender {

	proportion = 1
	imageStyle = {}
	placeholderImageStyle = {}

    constructor(props) {
		const { width, height } = props
		this.proportion = width / height

		const { cover, contain } = props
		this.backgroundSize = cover? 'cover'
			: contain? 'contain'
			: width && height? width + 'px ' + height + 'px '
			: 'cover'
    }


	fillPlain = (props) => ({
		position: 'absolute',
		pointerEvents: 'none',
		padding: 0,
		width: props.width || '100%',
		height: props.height || '100%',
		...(props.style || {})
	})

	fillBackground = (styles = {}, props) => {
		return {
			...this.fillPlain(props),

			...styles,

			WebkitBackgroundSize: this.backgroundSize,
			MozBackgroundSize: this.backgroundSize,
			OBbackgroundSize: this.backgroundSize,
			backgroundSize: this.backgroundSize
        }
	}

    run(state, props) {
        const { width, height, src, placeholderSrc, backgroundStyles } = props
		const blur = props.blur || 0
        const blurFilter = 'blur(' + blur + 'px)'

        return <div style={this.fillPlain(props)}>

            <Spring config={ springConfig.slow }
                from={{ opacity: 0, filter: blurFilter }}
                to={ state.imageLoaded
                    ? { opacity: 1, filter: 'blur(0px)' }
                    : { opacity: 1, filter: blurFilter }
                }>
                { styles => <div style={
						this.fillBackground({
							backgroundImage: 'url('+placeholderSrc+')',
							backgroundRepeat: 'no-repeat',
							...styles,
							...backgroundStyles
						}, props)
					} />
                }
            </Spring>

            <Spring from={{ opacity: 0 }}
                to={ state.imageLoaded
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }>
				{ styles => <div style={
						this.fillBackground({
							backgroundImage: 'url('+src+')',
							backgroundRepeat: 'no-repeat',
							...styles,
							...backgroundStyles
						}, props)
					} />
                }
            </Spring>

        </div>
    }
}
