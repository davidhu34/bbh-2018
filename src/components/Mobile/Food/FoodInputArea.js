import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Grid, Icon, Input, Button } from 'semantic-ui-react'

import { foodFormChange, foodEditSubmit, foodEditEnd } from '../../../actions'

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
                    <Input fluid size="mini"
                        name="DESC"
                        value={form.DESC}
                        placeholder={'輸入品項...'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={14}>
                    <Input fluid size="mini"
                        name="COUNT"
                        value={form.COUNT}
                        placeholder={'輸入份量... i.g. 一碗'}
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
                        name="CALORIES"
                        value={form.CALORIES}
                        placeholder={'熱量'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={5}
                    textAlign={'left'}
                    style={{ margin: 'auto 0'}}>
                    cal
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={7}>
                    <Button fluid size="mini"
                        color={'teal'}
                        onClick={(e) => foodEditSubmit(form)}>
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
