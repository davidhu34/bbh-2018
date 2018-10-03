import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Table } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'
import Camera from '../Camera'

class Home extends Component {
    render () {
        return <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 0
        }}>
            <Header as="h3" textAlign='center' color="teal">
                {}
            </Header>
            <Header as="h2" textAlign='center' color="teal">
                {'Luke Skywalker\'s'}
            </Header>
            <Grid padded
                textAlign={'center'}
                verticalAlign={'middle'}>

                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                        <CircleProgress size={200} max={2500} value={2400}>
                            <HomeStatistic title={'目前體重'} value={100} unit={'kg'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>

                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny title={'目前體重'} value={100} unit={'kg'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny title={'目前體重'} value={100} unit={'kg'} />
                        </CircleProgress>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Grid columns={3}
                divided
                padded
                textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    bottom: '4rem',
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                }}>
                <Grid.Row>
                    <Grid.Column>
                        <HomeStatistic tiny title={'目前體重'} value={100} unit={'kg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic tiny title={'基礎代謝'} value={1200} unit={'kal'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic tiny title={'目標體重'} value={20} unit={'kg'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            
            <div style={{height: '500px', display:'block'}}>
            </div>

        </div>
    }
}
export default Home
