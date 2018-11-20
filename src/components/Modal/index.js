import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Loader } from 'semantic-ui-react'


const ModalComponent = ({ modal }) => {
    const { open, modalType, data, resolve } = modal
    console.log(modal)
    // if (open) {
        switch (modalType) {
            case 'LOADER':
                return <Modal basic open>
                    <Modal.Content>
                        <Loader inverted>Loading</Loader>
                    </Modal.Content>
                </Modal>
            default:
                return <span >{'kiu'}</span>
        }
    // } else return <span >{'kiu'}</span>
}


export default connect( ({ modal }) => ({ modal }) )(ModalComponent)
