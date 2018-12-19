import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Loader, Grid, Button, Icon } from 'semantic-ui-react'

import { closeModal, activityJoinSubmit } from '../../actions'

const ModalComponent = ({ modal, profile, closeModal, activityJoinSubmit }) => {
    const { open, modalType, data } = modal

    switch (modalType) {
        case 'ACTIVITY_JOIN_OPTIONS':
            const activity = data.activity
            return <Modal dimmer="inverted" open size="small">
                <Modal.Header style={{
                    textAlign: 'center',
                    margin: 'auto'
                }}>
                    {activity.desc}
                    <Icon
                        fitted
                        name="close"
                        onClick={(e) => closeModal()}
                        style={{ float: 'right' }} />
                </Modal.Header>
                <Modal.Content>
                    <Grid padded columns={2}>
                        <Grid.Row>
                            <b>
                                {'時間'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {(new Date(activity.time)).toLocaleDateString()}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'地點'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {activity.locationName}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'人數'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            <span style={{ color: 'teal' }}>{activity.participating}</span>
                            {'/' + activity.max + '人'}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'團長'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {activity.ownerName}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button fluid size="mini"
                                    color={'teal'}
                                    disabled={Number(activity.participating) >= Number(activity.max)}
                                    onClick={(e) => activityJoinSubmit(activity.participation == '2'? '0': '2')}>
                                    {activity.participation == '2'? '我要退出': '我要加入'}
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button fluid size="mini"
                                    onClick={(e) => activityJoinSubmit(activity.participation == '1'? '0': '1')}>
                                    {
                                        activity.participation == '1'? '取消關注'
                                        : activity.participation == '2'? '設為關注'
                                        : '我有興趣'
                                    }
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        case 'FORM_ERROR':
            return <Modal dimmer="inverted" open>
                <Modal.Content>

                    <Grid columns={1}>
                        { data.errors.map( error => <Grid.Row>
                                <Grid.Column>{ error }</Grid.Column>
                            </Grid.Row>)
                        }
                        <Grid.Row>
                        <Grid.Column>
                            <Button fluid size="mini" onClick={(e) => closeModal()}>
                                {'好喔'}
                            </Button>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        case 'NO_NOTICE':
            return <Modal dimmer="inverted" open>
                <Modal.Content>

                    <Grid columns={1} padded>
                        <Grid.Row>
                            {'目前沒有新活動!'}
                        </Grid.Row>
                        <Grid.Row>
                            <Button fluid size="mini" onClick={(e) => closeModal()}>
                                {'好喔'}
                            </Button>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        case 'PROFILE':
            const user = profile.user
            return <Modal dimmer="inverted" open size="small">
                <Modal.Header style={{
                    textAlign: 'center',
                    margin: 'auto'
                }}>
                    { user.firstName +' '+ user.lastName }
                    <Icon
                        fitted
                        name="close"
                        onClick={(e) => closeModal()}
                        style={{ float: 'right' }} />
                </Modal.Header>
                <Modal.Content>
                    <Grid padded columns={2}>
                        <Grid.Row>
                            <b>
                                {'身高'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {user.height+'cm'}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'體重'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {user.weight+'kg'}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'基礎代謝'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {user.diabolism}
                        </Grid.Row>
                        <Grid.Row>
                            <b>
                                {'目標體重'}
                                <Icon size="small"
                                    rotated={'counterclockwise'}
                                    name="window minimize outline" />
                            </b>
                            {user.targetWeight+'kg'}
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        case 'UNAVAILABLE_FEATURE':
            return <Modal open>
                <Modal.Content>

                    <Grid columns={1} padded>
                        <Grid.Row>
                            {'本 Demo 未開放此功能'}
                            { data.feature? ('：'+data.feature): '' }
                        </Grid.Row>
                        <Grid.Row>
                            <Button fluid size="mini" onClick={(e) => closeModal()}>
                                {'好喔'}
                            </Button>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        default:
            return <span >{''}</span>
    }
}

export default connect(
    ({ modal, profile }) => ({ modal, profile }),
    dispatch => ({
        closeModal: () => dispatch(closeModal()),
        activityJoinSubmit: (participation) => dispatch(activityJoinSubmit(participation))
    })
)(ModalComponent)

export const ModalLoader = connect(
    ({ modal }) => ({ modal })
)(
    ({ modal }) => <Modal basic dimmer="inverted" open={modal.loading}>
        <Modal.Content>
            <Loader inverted>Loading</Loader>
        </Modal.Content>
    </Modal>
)
