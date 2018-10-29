import React, { Component } from 'react'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'
import { Button, Icon } from 'semantic-ui-react'

import ImageContainer from '../../ImageContainer'
import Canvas from '../../Canvas'

class Camera extends Component {

    camRef = null
    cameraPhoto = null
    insightsInterval = null
    state = {
        active: false,
        front: false,
        snapshotURI: '',
        insights: [],
        insightsTime: 0
    }

    constructor (props, context) {
        super(props, context)
    }

    componentDidMount () {
        this.cameraPhoto = new CameraPhoto(this.camRef)
        this.startCamera()
    }

    componentWillUnmount() {
        this.cameraPhoto.stopCamera()
        this.camRef = null
        this.cameraPhoto = null
        this.haltInsights()
    }

    channelInsights() {
        this.haltInsights()
        this.insightsInterval = setInterval( () => this.collectInsights(), 100)
    }

    collectInsights() {
        let time = (new Date).getTime()
        let random = Number(time.toString().substr(-1))*100

        setTimeout( () => {

            if (this.insightsInterval && this.state.insightsTime < time) {
                this.setState({
                    insightsTime: time,
                    insights: [1,2,3].map( (data, i) => ({
                        calories: 10*data + 100,
                        desc: 10*data + random/10,
                        x0: 10*data,
                        y0: 10*data,
                        x1: 10*data + 100,
                        y1: 10*data + random/10,
                    }))
                })
            }

        }, random)
    }

    haltInsights() {
        if (this.insightsInterval) {
            clearInterval(this.insightsInterval)
            this.insightsInterval = null
            this.setState({
                insightsTime: 0,
                insights: []
            })
        }
    }

    startCamera (front) {
        let resolution = {
            width: this.props.width,
            height: this.props.height
        }
        let mode = front
            ? FACING_MODES.USER
            : FACING_MODES.ENVIRONMENT

        this.cameraPhoto.startCamera(mode, resolution)
            .then( () => {
                if (this.camRef) {
                    this.channelInsights()
                    this.setState({
                        front, resolution, active: true
                    })
                }
                console.log('Camera Started!', front? 'front': 'main')
            })
            .catch( (error) => {
                console.error('Camera not started!', error)
                this.setState({ active: false })
            })
    }

    stopCamera () {
        this.haltInsights()
        this.cameraPhoto.stopCamera()
            .then( () => {
                this.setState({
                    active: false,
                    front: false,
                    snapshotURI: ''
                })
                console.log('Camera stopped!')
            })
            .catch( (error) => {
                console.log('No camera to stop!:', error)
            })
    }

    switchFrontCamera(isFront) {
        let { active, front } = this.state
        if (isFront != front) {
            if (active) this.startCamera(isFront)
            else this.setState({ front: isFront })
        }
    }

    getSnapshot(config = {}) {
        if (this.state.active) {
            this.haltInsights()
            this.setState({
                snapshotURI: this.cameraPhoto.getDataUri(config)
            })
            this.props.displaySnapshot(this.state.insights)
        }
    }
    clearSnapshot() {
        if (this.state.active) {
            this.setState({ snapshotURI: '' })
            this.channelInsights()
        }
    }

    getCameraSettings() {
        return this.cameraPhoto == null? {}
            : this.cameraPhoto.getCameraSettings() || {}
    }

    render () {
        let { front, active, snapshotURI, insights } = this.state
        let { aspectRatio, frameRate, height, width } = this.getCameraSettings()

        return <div style={{
            position: 'absolute',
            width: '100%',
            height: height,
            textAlign: 'center',
            padding: 'auto',
            backgroundColor: 'black'
        }}>
            <video ref={ ref => {this.camRef = ref} }
                autoPlay
                playsInline
                width={this.props.width}
                height={this.props.height}
                style={{
                    display: snapshotURI? 'none': 'inline-block',
                    position: 'relative'
                }}
            />


            { snapshotURI
                ? <div style={{ position: 'relative', }}>
                    <ImageContainer standalone
                        width={width} height={height}
                        src={this.state.snapshotURI}
                    />
                </div>
                : null
            }

            <div style={{
                position: 'absolute',
                width: '100%',
                top: 0
            }}>
                { active
                    ? <Canvas
                        rectangles={insights}
                        width={width}
                        height={height} />
                    : null
                }
            </div>

            <div style={{
                position: 'absolute',
                width: '100%',
                bottom: '-1.5em'
            }}>
                { snapshotURI
                    ? <div>
                        <Icon circular size='big' inverted color='teal'
                            name='redo alternate'
                            onClick={ () => {
                                this.clearSnapshot()
                            }} />
                        <Icon color='transparent'/>
                        <Icon circular size='big' inverted color='teal'
                            name='upload'
                            onClick={ () => {
                                this.stopCamera()
                            }} />
                    </div>
                    : <div>
                        <Icon circular size='big' inverted color='teal'
                            name='refresh'
                            onClick={ () => {
                                this.switchFrontCamera(!front)
                            }} />
                        <Icon color='transparent'/>
                        <Icon circular size='big' inverted color='teal'
                            name='camera'
                            onClick={ () => {
                                this.getSnapshot()
                            }} />
                    </div>
                }
            </div>

        </div>
    }
}

export default Camera
