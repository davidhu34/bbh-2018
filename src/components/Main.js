import React, { Component } from 'react'
import { Responsive } from 'semantic-ui-react'

import Mobile from './Mobile'

const Main = () => <div>
    <Responsive maxWidth={Responsive.onlyComputer.minWidth-1}>
        <Mobile />
    </Responsive>

    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <div>
            Please switch to a mobile device, or adjust and scale down to smaller screen size for mobile demonstration.
        </div>
    </Responsive>
</div>

export default Main
