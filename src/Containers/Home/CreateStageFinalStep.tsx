import React from 'react';
import stageIcon from '../../assets/images/stage-icon-1.png'
import {CheckCircleOutline} from '@material-ui/icons';
import { Grow } from '@material-ui/core';

export const CreateStageSuccessStep = () => {
    const [checked] = React.useState(true);
    return (
        <div className="my-4">
            <img src={stageIcon} alt="stage" width="100px" height="100px"/>
            <h3 className="white my-3">Test stage</h3>
            <h5 className="white my-3">Stage "Test stage" <br/>
                has been succssesfully created!
            </h5>
            <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
            >
            <CheckCircleOutline className="white my-1" style={{ fontSize: 40 }}/>
            </Grow>
        </div >
    )
}