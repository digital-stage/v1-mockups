import React, { MouseEventHandler } from 'react';
import Icons from '../../Components/Icons/Icons';
import ButtonStyled from '../../Components/Form/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Group } from './SelectPresetStep';

export const GroupLayout = (props: { group: Group, handleGroupDelete?: MouseEventHandler | undefined,  onClick?: MouseEventHandler | undefined}) => {
    const { group: {
        name,
        color,
        icon
    }, handleGroupDelete, onClick } = props
    return (
        <div className="text-center p-2" style={{ width: "calc(100% / 5)" }}>
            <div style={{ border: `1px solid ${color}`, borderRadius: "10px" }}>
                <div className="text-right white p-0 pr-2 pt-0" onClick={handleGroupDelete}><CloseIcon style={{ fontSize: 16, cursor:"pointer" }} /></div>
                <Icons icon={icon} type="circled" circleColor={color} width={40} height={40} />
                <p className="mb-4 mt-1 white">{name}</p>
            </div>
            <ButtonStyled
                style={{ marginTop: "-35px", minWidth: "auto"}}
                className="button-white px-2 py-1"
                text="edit"
                type="submit"
                onClick={onClick}
            />
        </div>
    )
}