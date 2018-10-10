import React, { Component } from 'react'

import { Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

const FoodList = ({ foodDataList, editFood }) => (
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
                    ●
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={6}>
                    {food.desc}
                </Grid.Column>
                <Grid.Column width={3}>
                    {food.calorie}
                </Grid.Column>
                <Grid.Column width={3}>
                    cal
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={2}>
                    +
                </Grid.Column>
            </Grid.Row>)
        }
    </Grid>
)
export default FoodList
