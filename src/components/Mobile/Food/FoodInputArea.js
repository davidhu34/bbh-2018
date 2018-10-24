import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

import { foodFormChange, foodEditSubmit,  foodEditEnd } from '../../../actions'

class FoodInputArea extends Component {

    handleChange = (e, { name, value }) => this.props.foodFormChange({ [name]: value })

    render () {

        const {
            foodEditSubmit,
            foodEditEnd,
            foodUI
        } = this.props

        const form = foodUI.form

        return <Form>
        <Form.Group>
        <Grid padded>
            <Grid.Row style={{
                borderTop: '1px',
                borderTopStyle: 'solid',
                borderTopColor: 'lightgray',
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={14}>
                    <Input fluid size="mini" name="DESC"
                        value={form.DESC}
                        placeholder={'desc...'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={5}>
                    <Input fluid size="mini"
                        name="COUNT"
                        value={form.COUNT}
                        placeholder={'count'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={5} style={{ margin: 'auto 0'}}>
                    fdghgfdh
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={5}>
                    <Input fluid size="mini"
                        name="CALORIES"
                        value={form.CALORIES}
                        placeholder={'cal...'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={5} style={{ margin: 'auto 0'}}>
                    sqdfqwe
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={7}>
                    <Button fluid size="mini" onClick={
                        e => foodEditSubmit(form)
                    }>
                        確認
                    </Button>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Button fluid size="mini" onClick={
                        e => { foodEditEnd() }
                    }>
                        取消
                    </Button>
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid.Row>
            <Grid.Row />
        </Grid>
        </Form.Group>
        </Form>
    }
}

export default connect(
    ({ foodUI }) => ({ foodUI }),
    dispatch => ({
        foodEditSubmit: (form) => dispatch(foodEditSubmit(form)),
        foodEditEnd: () => dispatch(foodEditEnd()),
        foodFormChange: (change) => dispatch(foodFormChange(change))
    })
)(FoodInputArea)
