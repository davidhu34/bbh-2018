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
        let { value, max, size } = this.props
        let width = (size || 100) + 'px'
        let height = width

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
                    background
                    percentage={percentage*styles.opacity}
                    text={`${percentage}%`}
                    styles={{
                        root: { width, height },
                        background: { fill: 'azure', r: 40 },
                        path: {
                            strokeLinecap: 'round',
                            stroke: 'url(#id1)',
                            transform: 'rotate(-45deg)',
                            transformOrigin: 'center center'
                        },
                        text: { fill: 'transparent' },
                    }}
                 />}
            </Spring>

            <GradientSVG idCSS={'id1'}
                rotation={90}
                startColor={'azure'}
                endColor={'aquamarine'}
            />

        </div>
    }
}
export default CircleProgress
