import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Grid, Icon, Header } from 'semantic-ui-react'

import ActivityDetail from './ActivityDetail'
import ActivityInputArea from './ActivityInputArea'
import ActivityList from './ActivityList'

import { activityListSort, activityView, activityEdit } from '../../../actions'


class Activity extends Component {

    viewActivity = (index) => this.props.activityView(index)
    editActivity = (index) => this.props.activityEdit(index)

    getActivityDataList(start, end) {
        const { activityData, activityUI } = this.props
        return activityUI.list.slice(start,end).map( id => activityData.data[id] )
    }

    render () {
        const {
            activityListSort,
            activityData,
            activityUI
        } = this.props

        const { list, viewing, viewingMode, loading } = activityUI

        const viewingIndex = list.indexOf(viewing)
        const middle = viewingIndex < 0? list.length: viewingIndex + 1
        const activityDataList = list.map( id => activityData.data[id] )

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
                        <Icon size="large" name="add circle" />
                    </Grid.Column>
                    <Grid.Column>
                        <Icon size="large" name="heart"  />
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
                            borderColor: activityUI.sorting == 'TIME'? 'red': 'transparent',
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
                            borderColor: activityUI.sorting == 'DISTANCE'? 'red': 'transparent',
                        }}>
                            <div style={{color:'transparent'}}>{'_'}</div>
                            {'距離'}
                            <div style={{color:'transparent'}}>{'_'}</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column onClick={ (e) => activityListSort('PARTICIATION')}>
                        <div style={{
                            display: 'inline-flex',
                            borderBottom: '4px',
                            borderBottomStyle: 'solid',
                            borderColor: activityUI.sorting == 'PARTICIATION'? 'red': 'transparent',
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
                        activityDataList={activityDataList.slice(middle)}
                    />

                </React.Fragment>
            }

            <div style={{ height: '500px', display:'block' }} />

        </div>
    }
}

export default connect(
    ({ activityData, activityUI }) => ({
        activityData, activityUI
    }),
    dispatch => ({
        activityListSort: (sorting) => dispatch(activityListSort(sorting)),
        activityView: (activityId) => dispatch(activityView(activityId)),
        activityEdit: (activityId) => dispatch(activityEdit(activityId)),
    })
)(Activity)
