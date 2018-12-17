import React, { Component } from 'react'

import { Grid, Icon } from 'semantic-ui-react'

const ExerciseList = ({ exerciseDataList }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            margin: 'auto'
        }}>
        {   exerciseDataList.map( (exercise,i) => <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: 'ghostwhite'
            }}>
                <Grid.Column width={1}>
                    <Icon size="small" name="circle" />
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={6}>
                    <b>{exercise.desc}</b>
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {exercise.count}
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {exercise.calories+'cal'}
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid.Row>)
        }
    </Grid>
)
export default ExerciseList
