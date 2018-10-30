import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Grid, Icon, Button } from 'semantic-ui-react'

import { activityFormChange, activityEditSubmit,  activityEditEnd } from '../../../actions'

class ActivityInputArea extends Component {

    handleChange = (e, { name, value }) => this.props.activityFormChange({ [name]: value })

    render () {

        const {
            activityEditSubmit,
            activityEditEnd,
            activityUI
        } = this.props

        const form = activityUI.form

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
                <Grid.Column width={14}>
                    <Input fluid size="mini"
                        name="TIME"
                        value={form.TIME}
                        placeholder={'date time'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={1} style={{ margin: 'auto 0'}}>
                    fdghgfdh
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={5}>
                    <Input fluid size="mini"
                        name="MAX"
                        value={form.MAX}
                        placeholder={'max participants...'}
                        onChange={this.handleChange}
                    />
                </Grid.Column>
                <Grid.Column width={5} style={{ margin: 'auto 0'}}>
                    {'人'}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{
                paddingBottom: 0
            }}>
                <Grid.Column width={1} />
                <Grid.Column width={7}>
                    <Button fluid size="mini" onClick={
                        e => activityEditSubmit(form)
                    }>
                        確認
                    </Button>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Button fluid size="mini" onClick={
                        e => { activityEditEnd() }
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
    ({ activityUI }) => ({ activityUI }),
    dispatch => ({
        activityEditSubmit: (form) => dispatch(activityEditSubmit(form)),
        activityEditEnd: () => dispatch(activityEditEnd()),
        activityFormChange: (change) => dispatch(activityFormChange(change))
    })
)(ActivityInputArea)
