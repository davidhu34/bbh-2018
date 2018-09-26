import React from 'react'

import CircularProgressbar from 'react-circular-progressbar';

const Food = () => (
    <div>
        Food
        <div style={{ width: '100px' }}>
            <CircularProgressbar percentage={60} text={`${'60'}%`} />
        </div>
    </div>
)
export default Food
