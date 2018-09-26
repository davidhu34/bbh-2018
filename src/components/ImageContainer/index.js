import React, { Component } from 'react'

import StandaloneRender from './StandaloneRender'
import LayerRender from './LayerRender'

export default class ImageContainer extends Component {

	buffer = null
	onload = null
	renderrer = null

	constructor(props) {
		super(props)

		this.state = {
			imageLoading: true,
			imageLoaded: false
		}
        let { standalone, layer } = this.props
		this.renderrer = standalone? new StandaloneRender(this.props)
			: layer? new LayerRender(this.props)
			: null
	}

	componentWillMount() {
		this.onload = this.onImageGet.bind(this)
	}

	componentDidMount() {
		this.buffer = new Image()
        this.buffer.addEventListener('load', this.onload)
		this.buffer.src = this.props.src
	}

	componentWillUnmount() {
		this.buffer.removeEventListener('load', this.onload)
	}

	onImageGet() {
		this.setState({
			imageLoaded: true,
			imageLoading: false
		})
	}

	render() {
		return this.renderrer
			? this.renderrer.run(this.state, this.props)
			: null
	}
}
