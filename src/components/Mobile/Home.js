import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Table } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'

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

            <Grid padded
                textAlign={'center'}>
                <Grid.Row textAlign={'center'}>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        <Icon name="angle left" />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny title={'目前體重'} value={100} unit={'kg'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        <Icon name="angle right" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid columns={3}
                padded
                relaxed
                textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                }}>
                <Grid.Row>
                    <Grid.Column>
                        <Icon size="large" name="calendar outline" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="add circle" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="heart"  />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid padded columns={3}
                textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                    marginTop: 0,
                }}>
                <Grid.Row style={{
                    paddingBottom: 0
                }}>
                    <Grid.Column>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: 'red',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'日期'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: 'red',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'日期'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'日期'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                    backgroundColor: 'ghostwhite',
                    margin: 'auto'
                }}>
                { [1,1,1].map( a => <Grid.Row style={{
                        borderTop: '1px',
                        borderTopStyle: 'solid',
                        borderTopColor: 'lightgray',
                        backgroundColor: 'ghostwhite'
                    }}>
                        <Grid.Column width={1}>
                            ●
                        </Grid.Column>
                        <Grid.Column textAlign={'left'} width={6}>
                            hjgfhj
                        </Grid.Column>
                        <Grid.Column width={3}>
                            htjfytju
                        </Grid.Column>
                        <Grid.Column width={3}>
                            htjfytju
                        </Grid.Column>
                        <Grid.Column textAlign={'left'} width={2}>
                            +
                        </Grid.Column>
                    </Grid.Row>
                )}
            </Grid>

            <div style={{height: '500px', display:'block'}}>
            </div>

        </div>
    }
}
export default Home
