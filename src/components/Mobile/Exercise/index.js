import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header } from 'semantic-ui-react'


import { getCaloriesConsumed } from '../../../reducers/exercise'
import { getDateId } from '../../../utils'

import CircleProgress from '../CircleProgress'
import HomeStatistic from '../HomeStatistic'

import ExerciseList from './ExerciseList'
import MenuList from './MenuList'
import MapList from './MapList'

import {
    exerciseListFilter,
    exerciseTimeChange,
    exerciseModeChange,
    exerciseMapView,
    pushRoute,
    unavailable,
} from '../../../actions'

class Exercise extends Component {

    render () {
        const {
            exerciseListFilter,
            exerciseData,
            exerciseUI,
            exerciseDateChange,
            changeMode,
            viewMap,
            unavailablePopup
        } = this.props

        const { list, loading, filter, dateTime, dateId, mode, viewingMap } = exerciseUI

        const menuDataList = exerciseData.menuCategoryList[filter].map( m => exerciseData.menuData[m])


        const viewingDate = new Date(dateTime)
        const consumed = getCaloriesConsumed(viewingDate,exerciseData)

        const toNextDay = (e) => exerciseDateChange(viewingDate, 1, filter)
        const toPrevDay = (e) => exerciseDateChange(viewingDate, -1, filter)


        const exerciseDataList = exerciseData.dateList[dateId].map( id => exerciseData.data[id] )

        const mapDataList = exerciseData.mapList.map(m => exerciseData.mapData[m])
        const viewingMapSource = (exerciseData.mapData[viewingMap] || {}).source || ''

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
                        { exerciseUI.hasPrevDay
                            ? <Icon name="angle left" onClick={toPrevDay} />
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <CircleProgress size={150} max={2500} value={1234}>
                            <HomeStatistic tiny
                                title={'消耗'}
                                value={consumed}
                                unit={'cals'} />
                        </CircleProgress>
                    </Grid.Column>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        { exerciseUI.hasNextDay
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
                    paddingBottom: 0,
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                }}>
                    <Grid.Column>
                        <Icon size="large" name="fire"
                            color={mode == 'WORKOUT'? 'pink': null}
                            onClick={() => changeMode('WORKOUT')}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="clipboard list"
                            color={mode == 'MENU'? 'pink': null}
                            onClick={() => changeMode('MENU')}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="map"
                            color={mode == 'MAPS'? 'pink': null}
                            onClick={() => changeMode('MAPS')}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid padded columns={4}
                textAlign={'center'}
                verticalAlign={'middle'}
                style={{
                    marginTop: 'auto',
                }}>
                <Grid.Row>
                    <b>{
                        mode == 'MENU'? '運動菜單'
                        : mode == 'WORKOUT'? '運動紀錄'
                        : mode == 'MAPS'? '運動路線'
                        : null
                    }</b>
                </Grid.Row>
                { mode == 'MENU'?
                    <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Grid.Column onClick={ (e) => exerciseListFilter('LIGHT')}>
                            <div style={{
                                display: 'inline-flex',
                                borderBottom: '4px',
                                borderBottomStyle: 'solid',
                                borderColor: exerciseUI.filter == 'LIGHT'? 'pink': 'transparent',
                            }}>
                                <div style={{color:'transparent'}}>{'_'}</div>
                                {'輕度'}
                                <div style={{color:'transparent'}}>{'_'}</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column onClick={ (e) => exerciseListFilter('MEDIUM')}>
                            <div style={{
                                display: 'inline-flex',
                                borderBottom: '4px',
                                borderBottomStyle: 'solid',
                                borderColor: exerciseUI.filter == 'MEDIUM'? 'pink': 'transparent',
                            }}>
                                <div style={{color:'transparent'}}>{'_'}</div>
                                {'輕度'}
                                <div style={{color:'transparent'}}>{'_'}</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column onClick={ (e) => exerciseListFilter('HARD')}>
                            <div style={{
                                display: 'inline-flex',
                                borderBottom: '4px',
                                borderBottomStyle: 'solid',
                                borderColor: exerciseUI.filter == 'HARD'? 'pink': 'transparent',
                            }}>
                                <div style={{color:'transparent'}}>{'_'}</div>
                                {'重度'}
                                <div style={{color:'transparent'}}>{'_'}</div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    : null
                }
            </Grid>

            { mode == 'MENU'? <MenuList menuDataList={menuDataList} />
            : mode == 'WORKOUT'? <ExerciseList exerciseDataList={exerciseDataList} />
            : mode == 'MAPS'? <MapList
                viewMap={viewMap}
                viewingMap={viewingMap}
                viewingMapSource={viewingMapSource}
                mapDataList={mapDataList} />
            : null
            }

            <div style={{ height: '4rem', display:'block' }} />

        </div>
    }
}

export default connect(
    ({ exerciseData, exerciseUI }) => ({
        exerciseData, exerciseUI
    }),
    dispatch => ({
        changeMode: (mode) => dispatch(exerciseModeChange(mode)),
        viewMap: (mapId) => dispatch(exerciseMapView(mapId)),
        exerciseDateChange: (date, diff, filter) => {
            const newDate = new Date(date.setDate(date.getDate()+diff))
            dispatch(exerciseTimeChange({ date: newDate, filter: filter }))
        },
        exerciseListFilter: (filter) => dispatch(exerciseListFilter(filter)),
        unavailablePopup: (feature) => dispatch(unavailable(feature))
    })
)(Exercise)
