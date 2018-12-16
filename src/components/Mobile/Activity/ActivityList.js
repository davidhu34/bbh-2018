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
                const { participation, participating, max, locationName } = activity
                const avail = Number(participating) < Number(max)
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
                        if (avail) switch (activity.participation) {
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
                        { avail? <Icon size="small"
                            disabled={participation == 0}
                            color={
                                participation == 3? 'teal': 'pink'
                            } name={
                                participation == 3? 'pencil'
                                : participation == 2? 'check circle'
                                : participation == 1? 'heart'
                                : participation == 0? 'add circle'
                                : 'circle'
                            }/>
                            : '滿'
                        }
                    </Grid.Column>
                    <Grid.Column textAlign={'left'} width={6}>
                        <b>{activity.desc}</b>
                    </Grid.Column>
                    <Grid.Column textAlign={'right'} width={4}>
                        { locationName }
                    </Grid.Column>
                    <Grid.Column textAlign={'right'} width={2}>
                        { dateStr }
                    </Grid.Column>
                    <Grid.Column textAlign={'left'} width={2} onClick={ e => viewActivity(activity.id) }>
                    <Icon size="small" name="caret down" />
                    </Grid.Column>
                </Grid.Row>
            })
        }
    </Grid>
}
export default ActivityList
