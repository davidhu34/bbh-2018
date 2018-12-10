import React, { Component } from 'react'
import axios from 'axios'
import { Button, Icon } from 'semantic-ui-react'
import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'

import { INSIGHT_API, INSIGHTS_INTERVAL } from '../../../configs'
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
        this.insightsInterval = setInterval( () => this.collectInsights(), INSIGHTS_INTERVAL)
    }

    collectInsights() {

        const dataUri = this.cameraPhoto.getDataUri({ imageType: IMAGE_TYPES.JPG })
        // this.fetchInsight(dataUri)
        this.fetchInsightDev(dataUri)


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
        const resolution = {
            // width: this.props.width,
            // height: this.props.height
        }
        const mode = front
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
        const { active, front } = this.state
        if (isFront != front) {
            if (active) this.startCamera(isFront)
            else this.setState({ front: isFront })
        }
    }

    getSnapshot() {
        if (this.state.active) {
            this.haltInsights()
            const dataUri = this.cameraPhoto.getDataUri({ imageType: IMAGE_TYPES.JPG })
            this.setState({
                snapshotURI: dataUri
            })
            this.props.displaySnapshot(this.state.insights)


            this.fetchInsightDev(dataUri).then( insights => {
            // this.fetchInsight(dataUri).then( insights => {
                console.log()
            }).catch( error => {
                console.log(error)
            })
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

    fetchInsight(dataUri) {

        const time = (new Date()).getTime()
        return new Promise( (resolve, reject) => {
            // const file = this.dataURLtoFile(dataUri,'myFile')
            // const form = new FormData()
            // form.append('image', dataUri, file.name)

            return axios({
                method: 'post',
                url: INSIGHT_API,
                data: { image: dataUri },
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'crossdomain': true,
                    'crossDomain': true,
                }
            }).then( response => {
                const insights = response.data
                console.log(...insights,response);
                const { width, height, displaySnapshot } = this.props

                const cameraSettings = this.getCameraSettings()
                const camHeight = cameraSettings.height
                const camWidth = cameraSettings.width

                const widthOffset = (camWidth - width) / 2
                const heightOffset = (camHeight - height) / 2

                this.setState({
                    insightsTime: time,
                    insights: insights.map( (insight, i) => ({
                        calories: insight.calories,
                        desc: insight.food_name,
                        x1: insight.x1*camWidth - widthOffset,
                        y1: insight.y1*camHeight - heightOffset,
                        x2: insight.x2*camWidth - widthOffset,
                        y2: insight.y2*camHeight - heightOffset,
                    }))
                })

                displaySnapshot(this.state.insights)
                return insights
            }).catch( error => {
                console.log(error)
            });
        })
    }

    fetchInsightDev () {
        const time = (new Date()).getTime()
        const random = Number(time.toString().substr(-1))*100
        return new Promise( (resolve, reject) => {
            setTimeout( () => {

                if (this.insightsInterval && this.state.insightsTime < time) {

                    const { width, height, displaySnapshot } = this.props
                    const cameraSettings = this.getCameraSettings()
                    const camHeight = cameraSettings.height
                    const camWidth = cameraSettings.width

                    const widthOffset = (camWidth - width) / 2
                    const heightOffset = (camHeight - height) / 2

                    const insights = [1,2,3].map( (data, i) => ({
                        food_name: 10*data + random/10,
                        calories: 10*data + 100,
                        desc: 100*data + random/10,
                        x1: 100*data - widthOffset,
                        y1: 100*data - heightOffset,
                        x2: 100*data + 100 - widthOffset,
                        y2: 100*data + random/10 - heightOffset,
                    }))
                    this.setState({
                        insightsTime: time,
                        insights: insights
                    })
                    return insights
                }

            }, random)
        })
    }
    render () {
        const { front, active, snapshotURI, insights } = this.state
        const cameraSettings = this.getCameraSettings()
        const {
            aspectRatio,
            frameRate,
        } = cameraSettings

        const camHeight = cameraSettings.height
        const camWidth = cameraSettings.width

        const { width, height } = this.props
        console.log(width, camWidth, height, camHeight, aspectRatio, (width - (height*aspectRatio))/2)
        return <div style={{
            position: 'absolute',
            width: '100%',
            height: height,
            textAlign: 'center',
            padding: 'auto',
            backgroundColor: 'black',
            overflow: 'hidden'
        }}>
            <video ref={ ref => {this.camRef = ref} }
                autoPlay
                playsInline
                width={width}
                height={width}
                style={{
                    position: 'relative',
                    display: snapshotURI? 'none': 'inline-block',
                    width: width,
                    height: height,
                    maxHeight: width,
                    objectFit: 'cover',
                }}
            />


            { snapshotURI
                ? <div style={{
                    position: 'relative',
                    top: aspectRatio > 1? 0 : ((height - (width/aspectRatio))/2),
                    left: aspectRatio > 1? (width - (height*aspectRatio))/2 : 0,
                }}>
                    <ImageContainer standalone
                        width={aspectRatio > 1? (height*aspectRatio) : height}
                        height={aspectRatio > 1? height : (width/aspectRatio)}
                        src={this.state.snapshotURI}
                    />
                </div>
                : null
            }

            <div style={{
                position: 'absolute',
                width: '100%',
                top: 0,

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
