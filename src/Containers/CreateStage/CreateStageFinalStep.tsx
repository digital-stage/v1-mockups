import React from 'react';
import { CheckCircleOutline } from '@material-ui/icons';
import { Grow } from '@material-ui/core';
import { useCreateStage } from '../../hooks/useCreateStage';

export const CreateStageSuccessStep = () => {
    const { info, image } = useCreateStage();
    const [checked] = React.useState(true);
    return (
        <div className="my-4">
            <img className="stage-image" src={image} alt="stage" width="100px" height="100px" />
            <h3 className="white my-3">{info.name}</h3>
            <h5 className="white my-3">Stage "{info.name}" <br />
                has been succssesfully created!
            </h5>
            <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
            >
                <CheckCircleOutline className="white my-1" style={{ fontSize: 40 }} />
            </Grow>
        </div >
    )
}