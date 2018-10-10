import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

import CircleProgress from '../CircleProgress'
import HomeStatistic from '../HomeStatistic'

import FoodInputArea from './FoodInputArea'
import FoodList from './FoodList'
import { foodListFilter, foodEditSubmit, foodEdit, foodEditEnd } from '../../../actions'


class Food extends Component {

    editFood (index) {
        this.props.foodEdit(index)
    }

    getfoodDataList(start, end) {
        const { foodData, foodUI } = this.props
        return foodUI.list.slice(start,end).map( id => foodData.data[id] )
    }

    render () {
        const {
            foodListFilter,
            foodEditSubmit,
            foodEditEnd,
            foodData,
            foodUI
        } = this.props

        const editing = foodUI.editing || ''
        const editingIndex = foodUI.list.indexOf(editing)
        const middle = editingIndex < 0? foodUI.list.length: editingIndex + 1
        const foodDataList = [
            this.getfoodDataList(0, middle),
            this.getfoodDataList(middle)
        ]
        console.log('EDITING',editing)

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

                    <FoodList editFood={ this.editFood.bind(this) }
                        foodDataList={this.getfoodDataList(0, middle)}
                    />

                    { editing
                        ? <FoodInputArea
                            preset={ foodData.data[editing] }
                            filter={ foodUI.filter }
                            submit={ food => foodEditSubmit(food)}
                            cancel={ () => foodEditEnd() }
                        />
                        : null
                    }

                    <FoodList editFood={ this.editFood.bind(this) }
                        foodDataList={this.getfoodDataList(middle)}
                    />

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
                                foodEditSubmit({
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
        foodEditSubmit: (food) => dispatch(foodEditSubmit(food)),
        foodEdit: (index) => dispatch(foodEdit(index)),
        foodEditEnd: () => dispatch(foodEditEnd())
    })
)(Food)
