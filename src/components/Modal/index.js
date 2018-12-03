import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Loader, Grid, Button } from 'semantic-ui-react'

import { closeModal, activityJoinSubmit } from '../../actions'

const ModalComponent = ({ modal, closeModal, activityJoinSubmit }) => {
    const { open, modalType, data } = modal

    switch (modalType) {
        case 'ACTIVITY_JOIN_OPTIONS':
            return <Modal open>
                <Modal.Content>
                    {'asdfsadf'}

                    <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Button fluid size="mini" onClick={(e) => activityJoinSubmit('2')}>
                                我要加入
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button fluid size="mini" onClick={(e) => activityJoinSubmit('1')}>
                                我有興趣
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>

                </Modal.Content>
            </Modal>
        case 'FORM_ERROR':
            return <Modal open>
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
        default:
            return <span >{''}</span>
    }
}

export default connect(
    ({ modal }) => ({ modal }),
    dispatch => ({
        closeModal: () => dispatch(closeModal()),
        activityJoinSubmit: (participation) => dispatch(activityJoinSubmit(participation))
    })
)(ModalComponent)

export const ModalLoader = connect(
    ({ modal }) => ({ modal })
)(
    ({ modal }) => <Modal basic open={modal.loading}>
        <Modal.Content>
            <Loader inverted>Loading</Loader>
        </Modal.Content>
    </Modal>
)
