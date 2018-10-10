import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

class FoodInputArea extends Component {
    state = {}

    constructor(props) {
        super(props)

        const preset = this.props.preset || {}
        this.state = {
            DESC: preset.desc || '',
            CALORIES: preset.calories || '',
            COUNT: preset.count || '',
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    getSubmission = () => {
        const time = (new Date()).getTime()
        const formData = {
            desc: this.state.DESC,
            count: this.state.COUNT.toString(),
            calories: this.state.CALORIES.toString(),
        }
        const preset = this.props.preset || {}
        return preset.id? {
            ...preset,
            ...formData
        } : {
            id: time.toString(),
            time: time,
            category: this.props.filter,
            tags: [],
            ...formData
        }
    }

    render () {
        const { submit, cancel } = this.props

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
                        defaultValue={this.state.DESC}
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
                        defaultValue={this.state.COUNT}
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
                        defaultValue={this.state.CALORIES}
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
                    <Button fluid size="mini" onClick={ e => submit(this.getSubmission()) }>確認</Button>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Button fluid size="mini" onClick={ e => { cancel(e) } }>取消</Button>
                </Grid.Column>
                <Grid.Column width={1} />
            </Grid.Row>
            <Grid.Row />
        </Grid>
        </Form.Group>
        </Form>
    }
}

export default FoodInputArea
