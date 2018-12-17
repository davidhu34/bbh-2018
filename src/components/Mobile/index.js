import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import AppBar from './AppBar'
import Home from './Home'
import Food from './Food'
import FoodCamera from './FoodCamera'
import Activity from './Activity'
import Exercise from './Exercise'
import Profile from './Profile'
import Footer from './Footer'
import Modal, { ModalLoader } from '../Modal'

class Mobile extends Component {

    getPage() {
        console.log(this.props.route.path)
        switch(this.props.route.path) {
            case '/activity':
                return <Activity />
            case '/exercise':
                return <Exercise />
            case '/camera':
                return <FoodCamera />
            case '/food':
                return <Food />
            case '/':
            default:
                return <Home />
        }
    }

    render() {

        return <div style={{
            backgroundColor: 'white',
            color: 'slategray',
            position: 'fixed',
            width: '100%',
            height: '100%',
            paddingTop: '3rem'
        }}>
            <AppBar />

            {this.getPage()}

            <Modal />
            <ModalLoader />
            <Footer />
        </div>
    }
}

export default withRouter(connect(
	({ route }) => ({ route })
)(Mobile))
