import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import { connect } from 'react-redux'

import { Grid, Icon, Header, Table } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'

import { getCaloriesGained } from '../../reducers/food'
import { getCaloriesConsumed } from '../../reducers/exercise'

class Home extends Component {
    render () {
        const { user, gained, burned } = this.props

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
                { user.firstName +' '+ user.lastName + '\'s' }
            </Header>
            <Grid padded
                textAlign={'center'}
                verticalAlign={'middle'}>

                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                        <CircleProgress size={200} max={2500} value={2400}>
                            <HomeStatistic
                                title={'今日熱量'}
                                value={ (Number(gained) - Number(burned)).toString() }
                                unit={'cal'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>

                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny
                                title={'攝取'}
                                value={gained || ''}
                                unit={'cal'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny
                                title={'消耗'}
                                value={burned || ''}
                                unit={'cal'} />
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
                        <HomeStatistic tiny
                            title={'目前體重'}
                            value={user.weight || '-'}
                            unit={'kg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic tiny
                            title={'基礎代謝'}
                            value={user.diabolism || '-'}
                            unit={'cal'} />
                    </Grid.Column>
                    <Grid.Column>
                        <HomeStatistic tiny
                            title={'目標體重'}
                            value={user.targetWeight || '-'}
                            unit={'kg'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>


            <div style={{height: '4rem', display:'block'}}>
            </div>

        </div>
    }
}
export default connect(
    state => {
        return {
            user: state.profile.user,
            gained: getCaloriesGained(new Date(), state.foodData),
            burned: getCaloriesConsumed(new Date(), state.exerciseData),
        }
    }
)(Home)
