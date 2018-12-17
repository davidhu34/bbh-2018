import React, { Component } from 'react'

import { Grid, Icon } from 'semantic-ui-react'

const MenuList = ({ menuDataList }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            margin: 'auto'
        }}>
        {   menuDataList.map( (menu,i) => <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: 'ghostwhite'
            }}>

                <Grid.Column textAlign={'left'} width={7}>
                    <b>{menu.desc}</b>
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {menu.count}
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {menu.calories+'cal'}
                </Grid.Column>
                <Grid.Column textAlign={'left'} width={1} />
            </Grid.Row>)
        }
    </Grid>
)
export default MenuList
