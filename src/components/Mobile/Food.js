import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

import CircleProgress from './CircleProgress'
import HomeStatistic from './HomeStatistic'
import FoodInputArea from './FoodInputArea'
import FoodList from './FoodList'
import { foodListFilter } from '../../actions'


class Food extends Component {

    foodDataList(start, end) {
        const { foodData, foodUI } = this.props
        return foodUI.list.slice(start,end).map( id => foodData.data[id] )
    }

    render () {
        const {
            foodListFilter,
            foodCreateSubmit,
            foodData,
            foodUI
        } = this.props

        const editingId = foodUI.list[foodUI.editing] || ''
        const editingData = editingId? foodData.data[editingId]: {}

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
                verticalAlign={'middle'}>
                <Grid.Row style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                }}>
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
                    marginTop: 'auto',
                }}
            >
                <Grid.Row style={{
                    paddingBottom: 0,
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
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
                : <React.Fragment>

                    <FoodList foodDataList={this.foodDataList(0,foodUI.editing)} />

                    { editingId
                        ? <FoodInputArea
                            preset={{ ...editingData }}
                            filter={ foodUI.filter }
                            submit={ food => foodCreateSubmit(food)}
                        />
                        : null
                    }

                    <FoodList foodDataList={this.foodDataList(foodUI.editing+1,foodUI.list.length)} />

                    <Grid textAlign={'center'}
                        verticalAlign={'middle'}
                        style={{
                            margin: 'auto'
                        }}
                    >
                        <Grid.Row style={{
                            borderTop: '1px',
                            borderTopStyle: 'solid',
                            borderTopColor: 'lightgray',
                        }}>
                            <Grid.Column onClick={ (e) => {
                                const time = (new Date()).getTime()
                                foodCreateSubmit({
                                    id: time.toString(),
                                    desc: time.toString(),
                                    time: time,
                                    category: foodUI.filter,
                                    tags: [],
                                    calorie: time.toString().substr(-3)
                                })
                            }}>
                                <Icon size="large" name="add" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </React.Fragment>
            }

            <div style={{ height: '500px', display:'block' }} />

        </div>
    }
}

export default connect(
    ({ foodData, foodUI }) => ({
        foodData, foodUI
    }),
    dispatch => ({
        foodListFilter: (filter) => dispatch(foodListFilter(filter)),
        foodCreateSubmit: (food) => dispatch({
            type: 'FOOD_CREATE_SUBMIT',
            food: food
        })
    })
)(Food)
