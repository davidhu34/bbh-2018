import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar';

import { Grid, Icon, Header } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'

class Home extends Component {
    render () {
        return <div>

            <Grid padded
                textAlign={'center'}
                verticalAlign={'middle'}>

                <Grid.Row style={{ paddingBottom: 0 }}>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                        <CircleProgress size={200} max={2500} value={2400} />
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>

                <Grid.Row style={{ paddingTop: 0 }}>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Grid columns={3}
                divided
                padded
                textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                }}>
                <Grid.Row>
                    <Grid.Column>
                        <HomeStatistic title={'目前體重'} value={100} unit={'kg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic title={'基礎代謝'} value={1200} unit={'kal'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic title={'目標體重'} value={20} unit={'kg'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    }
}
export default Home
