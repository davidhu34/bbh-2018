import React from 'react'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'

import { pushRoute, unavailable } from '../../../actions'

const items = [{
    icon: 'home',
    route: '/',
    feature: '首頁',
},{
    icon: 'food',
    route: '/food',
    feature: '飲食熱量紀錄',
},{
    icon: 'camera',
    route: '/camera',
    feature: '食物相機',
},{
    icon: 'bicycle',
    route: null,
    feature: '運動熱量消耗紀錄',
},{
    icon: 'group',
    route: '/activity',
    feature: '運動活動揪團',
},]
const Footer = ({
    route, pushRoute, unavailablePopup
}) => (
    <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '4rem',
        backgroundColor: 'white',
        borderTop: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'lightgray',
    }}>
        <Grid columns={5}
            padded
            relaxed
            textAlign={'center'}
            verticalAlign={'middle'}>
            <Grid.Row>
                {items.map( item => {
                    const isOnRoute = route.path == item.route
                    const onClick = item.route
                        ? () => pushRoute(item.route)
                        : () => unavailablePopup(item.feature)
                    return <Grid.Column key={item.feature} onClick={onClick}>
                        <Icon color={isOnRoute? 'teal': null}
                            size={isOnRoute? 'big': 'large'}
                            name={item.icon} />
                    </Grid.Column>
                })}
            </Grid.Row>
        </Grid>
    </div>
)

export default connect(
	({ route }) => ({ route }),
    dispatch => ({
        pushRoute: (route) => dispatch(pushRoute(route)),
        unavailablePopup: (feature) => dispatch(unavailable(feature)),
    })
)(Footer)
