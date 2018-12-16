import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header, Statistic } from 'semantic-ui-react'

import ActivityDetail from './ActivityDetail'
import ActivityInputArea from './ActivityInputArea'
import ActivityList from './ActivityList'

import {
    activityPreviewSchedule,
    activityListFilter,
    activityListSort,
    activityView,
    activityJoin,
    activityEdit,
} from '../../../actions'


class Activity extends Component {

    viewActivity = (id) => this.props.activityView(id)
    editActivity = (id) => this.props.activityEdit(id)
    joinActivity = (id) => this.props.activityJoin(id)

    getActivityDataList(start, end) {
        const { activityData, activityUI } = this.props
        return activityUI.list.slice(start,end).map( id => activityData.data[id] )
    }

    render () {
        const {
            changePreviewSchedule,
            activityListSort,
            activityData,
            activityUI,
            users,
        } = this.props


        const { list,
            viewing, viewingMode,
            previewScheduleIndex,
            loading,
            filter,
            sorting,
        } = activityUI

        const activityListFilter = (filter) => this.props.activityListFilter(filter, sorting)

        const viewingIndex = list.indexOf(viewing)
        const middle = viewingIndex < 0? list.length: viewingIndex + 1
        const activityDataList = list.map( id => activityData.data[id] )
            .map( a => ({
                ...a,
                participantsData: a.participants.map( p => users[p] )
            }))

        const previewSchedule = activityData.schedule[previewScheduleIndex] || ''
        const previewActivity = activityData.data[previewSchedule]

        const previewActivityDesc = previewActivity.desc || '目前無活動'
        const previewActivityDate = new Date(previewActivity.time)
        const due = Math.round((previewActivityDate.getTime() - (new Date()).getTime()) /86400000)
        const previewActivityDateStr = (previewActivityDate).toLocaleDateString() || ''

        console.log('VIEWING',viewing)

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

            <Grid padded
                textAlign={'center'}>
                <Grid.Row textAlign={'center'}>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        { previewScheduleIndex > 0
                            ? <Icon name="angle left"
                                onClick={ () => changePreviewSchedule(previewScheduleIndex-1) } />
                            : null
                        }
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Statistic size='mini' color={'teal'}>
                            <Statistic.Value>{ due + '天後' }</Statistic.Value>
                            <Statistic.Label>{ previewActivityDesc }</Statistic.Label>
                            <Statistic.Label>{ previewActivityDateStr }</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column width={4}
                        style={{
                            margin: 'auto'
                        }}>
                        { previewScheduleIndex < activityData.schedule.length - 1
                            ? <Icon name="angle right"
                                onClick={ () => changePreviewSchedule(previewScheduleIndex+1) } />
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
                    <Grid.Column onClick={ (e) => activityListFilter('ALL')}>
                        <Icon size="large" name="calendar alternate"
                            color={ filter == 'ALL'? 'pink': ''}  />
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => activityListFilter('MINE')}>
                        <Icon size="large" name="add circle"
                            color={ filter == 'MINE'? 'pink': ''}  />
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => activityListFilter('LIKED')}>
                        <Icon size="large" name="heart"
                            color={ filter == 'LIKED'? 'pink': ''} />
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
                    <Grid.Column onClick={ (e) => activityListSort('TIME')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: sorting == 'TIME'? 'pink': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'日期'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => activityListSort('DISTANCE')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: sorting == 'DISTANCE'? 'pink': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'距離'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => activityListSort('PARTICIPATION')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: sorting == 'PARTICIPATION'? 'pink': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'參與'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            { loading
                ? 'loading'
                : <React.Fragment>

                    <ActivityList
                        editActivity={ this.editActivity }
                        viewActivity={ this.viewActivity }
                        joinActivity={ this.joinActivity }
                        activityDataList={activityDataList.slice(0, middle)}
                    />

                    {
                        viewing && viewingMode == 'EDIT'
                            ? <ActivityInputArea />
                        : viewing && viewingMode == 'VIEW'
                            ?  <ActivityDetail activity={ activityDataList[middle-1] } />
                        : null
                    }

                    <ActivityList
                        editActivity={ this.editActivity }
                        viewActivity={ this.viewActivity }
                        joinActivity={ this.joinActivity }
                        activityDataList={activityDataList.slice(middle)}
                    />

                    { filter == 'MINE'
                        ?<Grid textAlign={'center'}
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
                                    this.editActivity(time.toString())
                                }}>
                                    <Icon inverted size="large" color="blue" name="add circle" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        : null
                    }

                </React.Fragment>
            }

            <div style={{ height: '4rem', display:'block' }} />

        </div>
    }
}

export default connect(
    ({ activityData, activityUI, profile }) => ({
        activityData, activityUI, users: profile.users
    }),
    dispatch => ({
        changePreviewSchedule: (index) => dispatch(activityPreviewSchedule(index)),
        activityListSort: (sorting) => dispatch(activityListSort(sorting)),
        activityListFilter: (filter, sorting) => dispatch(activityListFilter({filter, sorting})),
        activityView: (activityId) => dispatch(activityView(activityId)),
        activityEdit: (activityId) => dispatch(activityEdit(activityId)),
        activityJoin: (activityId) => dispatch(activityJoin(activityId)),
    })
)(Activity)
