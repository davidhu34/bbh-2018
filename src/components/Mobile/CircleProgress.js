import React, { Component } from 'react'
import { Spring, Transition, config as springConfig } from 'react-spring'
import CircularProgressbar from 'react-circular-progressbar';

import GradientSVG from './GradientSVG'
class CircleProgress extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render () {
        let width = (this.props.width || 100) + 'px'
        let height = (this.props.height || 100) +'px'
        let { value, max } = this.props
        let percentage = 100 * (value || 0) / (max || 100)

        return <div style={{
            width,
            height,
            margin: 'auto',
            textAlign: 'center'
        }}>
            <div style={{
                position: 'absolute',
                width,
                height,
            }}>
                {value}
            </div>

            <Spring config={ springConfig.slow }
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                { styles => <CircularProgressbar
                    percentage={percentage*styles.opacity}
                    text={`${percentage}%`}
                    styles={{
                        root: { width, height },
                        path: { stroke: 'url(#id1)' },
                        text: { fill: 'transparent' },
                    }}
                 />}
            </Spring>

            <GradientSVG idCSS={'id1'}
                rotation={300}
                startColor={'aquamarine'}
                endColor={'marine'}
            />

        </div>
    }
}
export default CircleProgress
