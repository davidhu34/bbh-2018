import React, { Component } from 'react'

import { Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

const FoodList = ({ foodDataList, selectFood }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            paddingTop: window.innerWidth + 30,
            margin: 'auto'
        }}>
        {   foodDataList.map( (food,i) => <Grid.Row key={i} style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: 'ghostwhite'
            }}>
                <Grid.Column width={1}>
                    <Icon size="mini" name="circle" />
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={6}>
                    {food.desc}
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={3}>
                    {food.calories}
                </Grid.Column>
                <Grid.Column width={3}>
                    cal
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={2} onClick={ e => selectFood(food.id) }>
                    <Icon size="mini" name="add circle" />
                </Grid.Column>
            </Grid.Row>)
        }
    </Grid>
)
export default FoodList
