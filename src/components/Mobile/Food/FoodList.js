import React, { Component } from 'react'

import { Grid, Icon } from 'semantic-ui-react'

const FoodList = ({ foodDataList, editFood, viewFood }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            margin: 'auto'
        }}>
        {   foodDataList.map( (food,i) => <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: 'ghostwhite'
            }}>
                <Grid.Column width={1} onClick={ e => editFood(food.id) }>
                    <Icon size="small" color="teal" name="pencil" />
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={6}>
                    <b>{food.desc}</b>
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={3}>
                    {food.count}
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={3}>
                    {food.calories+'cal'}
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={2} onClick={ e => viewFood(food.id) }>
                    <Icon size="small" name="caret down" />
                </Grid.Column>
            </Grid.Row>)
        }
    </Grid>
)
export default FoodList
