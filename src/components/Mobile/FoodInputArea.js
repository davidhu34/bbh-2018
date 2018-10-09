import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgressbar from 'react-circular-progressbar'

import { Form, Grid, Icon, Header, Table, Input, Button } from 'semantic-ui-react'

class FoodInputArea extends Component {
    ref = null
    state = {}
    names = ['DESC','COUNT','CALORIES']

    constructor(props) {
        super(props)

        let state = {}
        const preset = this.props.preset || {}
        this.names.map( name => {
            state[name] = preset[name] || ''
        })
        this.state = state;
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    getSubmission = () => {
        const time = (new Date()).getTime()
        return {
            id: time.toString(),
            desc: this.state.DESC,
            time: time,
            category: this.props.filter,
            count: this.state.COUNT,
            tags: [],
            calorie: this.state.CALORIES.toString(),
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
                        placeholder={'desc...'}
                        innerRef={ ref => { this.ref = ref } }
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
