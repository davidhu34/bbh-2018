import React, { Component } from 'react'

import { Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

const FoodList = ({ foodDataList, selectFood }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            paddingTop: window.innerWidth,
            margin: 'auto'
        }}>
        {   foodDataList.map( (food,i) => {
            console.log(food)
            return <Grid.Row key={i} style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: 'ghostwhite'
            }}>
                <Grid.Column width={1}>
                    <Icon size="small" name="circle" />
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
                <Grid.Column textAlign={'left'} width={2} onClick={ (e) => selectFood(food) }>
                    <Icon size="small" color="blue" inverted name="add circle" />
                </Grid.Column>
            </Grid.Row>})
        }
    </Grid>
)
export default FoodList
