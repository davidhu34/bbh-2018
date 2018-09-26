import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar';

import { Grid, Icon, Header } from 'semantic-ui-react'
import GradientSVG from './GradientSVG'
import CircleProgress from './CircleProgress'
class Home extends Component {
    render () {
        return <div style={{
            textAlign: 'center',
        }}>
        <Grid padded
            textAlign={'center'}
            verticalAlign={'middle'}>
            <Grid.Row>
                <Grid.Column width={2} />
                <Grid.Column width={12}>
                    <CircleProgress max={2500} value={1234} />
                </Grid.Column>
                <Grid.Column width={2} />
            </Grid.Row>
        </Grid>

        <Grid padded
            textAlign={'center'}
            verticalAlign={'middle'}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <CircleProgress max={2500} value={1234} />
                </Grid.Column>
                <Grid.Column width={8}>
                    <CircleProgress max={2500} value={1234} />
                </Grid.Column>
            </Grid.Row>
        </Grid>

        </div>
    }
}
export default Home
