import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header } from 'semantic-ui-react'

import CircleProgress from '../CircleProgress'
import HomeStatistic from '../HomeStatistic'

import FoodInputArea from './FoodInputArea'
import FoodList from './FoodList'
import FoodDetail from './FoodDetail'


import { getCaloriesGained } from '../../../reducers/food'
import { getDateId } from '../../../utils'

import {
    foodListFilter, foodEdit, foodView, foodTimeChange,
    pushRoute,
    unavailable
} from '../../../actions'


class Food extends Component {

    editFood = (index) => this.props.foodEdit(index)
    viewFood = (index) => this.props.foodView(index)

    render () {
        const {
            foodListFilter,
            foodData,
            foodUI,
            foodDateChange,
            takePhoto,
            unavailablePopup
        } = this.props


        const { list, viewing, viewingMode, loading, filter, dateTime } = foodUI

        const viewingDate = new Date(dateTime)
        const gained = getCaloriesGained(viewingDate,foodData)

        const toNextDay = (e) => foodDateChange(viewingDate, 1, filter)
        const toPrevDay = (e) => foodDateChange(viewingDate, -1, filter)

        const viewingIndex = list.indexOf(viewing)
        const middle = viewingIndex < 0? list.length: viewingIndex + 1
        const foodDataList = list.map( id => foodData.data[id] )
        console.log('EDITING',viewing)

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
            <Header as="h3" textAlign='center' color="teal">
                {viewingDate.toLocaleDateString()}
            </Header>

            <Grid textAlign={'center'}>
                <Grid.Row textAlign={'center'}>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        { foodUI.hasPrevDay
                            ? <Icon name="angle left" onClick={toPrevDay} />
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny
                                title={'攝取'}
                                value={gained}
                                unit={'cals'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        { foodUI.hasNextDay
                            ? <Icon name="angle right" onClick={toNextDay} />
                            : null
                        }
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
                        <Icon size="large" color="pink" name="list alternate" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon onClick={ () => takePhoto() } size="large" name="camera" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon onClick={ () => unavailablePopup('搜尋餐廳') } size="large" name="search"  />
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
                    <Grid.Column onClick={ (e) => foodListFilter('BREAKFAST')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: foodUI.filter == 'BREAKFAST'? 'pink': 'transparent',
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
                            borderColor: foodUI.filter == 'LUNCH'? 'pink': 'transparent',
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
                            borderColor: foodUI.filter == 'DINNER'? 'pink': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'晚餐'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => foodListFilter('SNACK')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: foodUI.filter == 'SNACK'? 'pink': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'宵夜'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            { loading
                ? 'loading'
                : <React.Fragment>

                    <FoodList
                        viewFood={ this.viewFood }
                        editFood={ this.editFood }
                        foodDataList={foodDataList.slice(0, middle)}
                    />

                    {
                        viewing && viewingMode == 'EDIT'
                            ? <FoodInputArea />
                        : viewing && viewingMode == 'VIEW'
                            ?  <FoodDetail food={foodDataList[middle-1]} />
                        : null
                    }

                    <FoodList
                        viewFood={ this.viewFood }
                        editFood={ this.editFood }
                        foodDataList={foodDataList.slice(middle)}
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
                                this.editFood(time.toString())
                            }}>
                                <Icon inverted size="large" color="blue" name="add circle" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </React.Fragment>
            }

            <div style={{ height: '4rem', display:'block' }} />

        </div>
    }
}

export default connect(
    ({ foodData, foodUI }) => ({
        foodData, foodUI
    }),
    dispatch => ({
        foodDateChange: (date, diff, filter) => {
            const newDate = new Date(date.setDate(date.getDate()+diff))
            dispatch(foodTimeChange({ date: newDate, filter: filter }))
        },
        foodListFilter: (filter) => dispatch(foodListFilter(filter)),
        foodEdit: (foodId) => dispatch(foodEdit(foodId)),
        foodView: (foodId) => dispatch(foodView(foodId)),
        takePhoto: (route) => dispatch(pushRoute('/camera')),
        unavailablePopup: (feature) => dispatch(unavailable(feature))
    })
)(Food)
