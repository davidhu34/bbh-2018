import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Icon, Label } from 'semantic-ui-react'


class ActivityDetail extends Component {

    render () {

        const { activity } = this.props
        return <Grid padded textAlign={"center"}>
            <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                paddingBottom: 0
            }} columns={2}>

                <Grid.Column>
                    參與人數：{ activity.participating + '/' + activity.max + '人' }
                </Grid.Column>

                <Grid.Column>
                    {(new Date(activity.time)).toLocaleDateString()}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: 0 }}>
                { activity.participantsData
                    .map( p => <Label as='a' color='teal' image key={p.id}>
                        <img src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />
                        { p.name }
                        { p.id == activity.owner? <Label.Detail>團長</Label.Detail>: null}
                    </Label>)
                }
            </Grid.Row>
            <Grid.Row />
        </Grid>
    }
}

export default ActivityDetail
