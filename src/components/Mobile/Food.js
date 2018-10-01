import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Table } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'

import { foodListFilter } from '../../actions'


class Food extends Component {
    render () {
        let { foodListFilter, foodData, foodUI } = this.props

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
                        <Icon size="large" name="list alternate" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="camera" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="search"  />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid padded columns={4}
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
                            borderColor: 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'早餐'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => foodListFilter('LUNCH')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: foodUI.filter == 'LUNCH'? 'red': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'午餐'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => foodListFilter('DINNER')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: foodUI.filter == 'DINNER'? 'red': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'晚餐'}
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
                            {'其他'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            { foodUI.loading
                ? 'loading'
                : <Grid textAlign={'center'}
                    verticalAlign={'middle'}
                    style={{
                        borderTop: '1px',
                        borderTopStyle: 'solid',
                        borderTopColor: 'lightgray',
                        margin: 'auto'
                    }}>
                    { foodUI.list.map( food => <Grid.Row style={{
                            borderTop: '1px',
                            borderTopStyle: 'solid',
                            borderTopColor: 'lightgray',
                            backgroundColor: 'ghostwhite'
                        }}>
                            <Grid.Column width={1}>
                                ●
                            </Grid.Column>
                            <Grid.Column textAlign={'left'} width={6}>
                                {food.desc}
                            </Grid.Column>
                            <Grid.Column width={3}>
                                {food.calorie}
                            </Grid.Column>
                            <Grid.Column width={3}>
                                cal
                            </Grid.Column>
                            <Grid.Column textAlign={'left'} width={2}>
                                +
                            </Grid.Column>
                        </Grid.Row>
                    )}
                    <Grid.Row style={{
                            borderTop: '1px',
                            borderTopStyle: 'solid',
                            borderTopColor: 'lightgray',
                        }}>
                        <Grid.Column>
                            <Icon size="large" name="add" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }

            <div style={{height: '500px', display:'block'}}>
            </div>

        </div>
    }
}

export default connect(
    ({ foodData, foodUI }) => ({
        foodData, foodUI
    }),
    dispatch => ({
        foodListFilter: (filter) => dispatch(foodListFilter(filter))
    })
)(Food)
