import React from 'react'

import { Statistic } from 'semantic-ui-react'

const HomeStatistic = ({ size, tiny, title, value, unit }) => (
    <div>
        <Statistic size={tiny? 'tiny': null} color="teal">
            { title? <Statistic.Label>{title}</Statistic.Label>: null}
            { value.toString().length? <Statistic.Value>{value}</Statistic.Value>: null}
            { unit? <Statistic.Label>{unit}</Statistic.Label>: null}
        </Statistic>
    </div>
)
export default HomeStatistic
