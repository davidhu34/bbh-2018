import React, { Component } from 'react'

import { Grid, Icon } from 'semantic-ui-react'

const ActivityList = ({
    activityDataList,
    editActivity, viewActivity, joinActivity
}) => {
    return <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            margin: 'auto'
        }}>
        {   activityDataList.map( (activity,i) => {
                const { participation } = activity
                const isOwner = participation == 3
                const date = new Date(activity.time)
                const dateStr = (date.getMonth()+1).toString()
                    + '/' + date.getDate().toString().padStart(2,'0')

                return <Grid.Row style={{
                    borderTop: '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: 'lightgray',
                    backgroundColor: 'ghostwhite'
                }}>
                    <Grid.Column width={1} onClick={ e => {
                        switch (activity.participation) {
                            case '3':
                                editActivity(activity.id);
                                break;
                            case '2':
                            case '1':
                            case '0':
                                joinActivity(activity.id)
                                break;
                            default:
                                break;
                        }
                    }}>
                        <Icon size="mini" name={
                            participation == 3? 'pencil'
                            : participation == 2? 'check circle'
                            : participation == 1? 'heart'
                            : participation == 0? 'add circle'
                            : 'circle'
                        }/>
                    </Grid.Column>
                    <Grid.Column textAlign={'left'} width={5}>
                        {activity.desc}
                    </Grid.Column>
                    <Grid.Column textAlign={'right'} width={3}>
                        { dateStr }
                    </Grid.Column>
                    <Grid.Column width={4}>
                        { activity.participating + '/' + activity.max + '人' }
                    </Grid.Column>
                    <Grid.Column textAlign={'left'} width={2} onClick={ e => viewActivity(activity.id) }>
                    <Icon size="mini" name="caret down" />
                    </Grid.Column>
                </Grid.Row>
            })
        }
    </Grid>
}
export default ActivityList
