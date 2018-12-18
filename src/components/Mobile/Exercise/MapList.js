import React, { Component } from 'react'

import { Grid, Icon } from 'semantic-ui-react'

const MapList = ({ mapDataList, viewingMap, viewingMapSource, viewMap }) => (
    <Grid textAlign={'center'}
        verticalAlign={'middle'}
        style={{
            margin: 'auto'
        }}>
        <Grid.Row style={{
            padding: 0,
            backgroundColor: 'lightcyan',
            height: viewingMapSource? window.innerWidth*250/375: '',
            backgroundImage: viewingMapSource? 'url("'+viewingMapSource+'")': '',
        }}>
        </Grid.Row>
        {   mapDataList.map( (mapData,i) => <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                backgroundColor: mapData.id == viewingMap? 'lightcyan': 'ghostwhite'
            }} onClick={() => viewMap(mapData.id)}>
                <Grid.Column textAlign={'left'} width={6}>
                    <b>{mapData.desc}</b>
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {mapData.category}
                </Grid.Column>
                <Grid.Column textAlign={'right'} width={4}>
                    {mapData.distance+'km'}
                </Grid.Column>
                <Grid.Column width={1}>
                    <Icon color="teal" name="map marker alternate" size="small" />
                </Grid.Column>
            </Grid.Row>)
        }
    </Grid>
)
export default MapList
