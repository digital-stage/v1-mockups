import React, { MouseEventHandler } from 'react';
import AddIcon from '@material-ui/icons/Add';

export const GroupLayoutEmpty = (props: { onClick?: MouseEventHandler | undefined }) => {
    const { onClick } = props
    return (
        <div className="text-center p-2" style={{ width: "calc(100% / 5)" }}>
            <div style={{
                border: `1px solid #F20544`,
                borderRadius: "10px",
                textAlign: "center",
                padding: "2px 0px"
            }}>
                <div className="my-4">
                    <AddIcon 
                    style={{
                        fontSize: 38,
                        backgroundColor: "#F20544",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }} 
                    onClick={onClick}
                    />
                    <p className="white">Add group</p>
                </div>
            </div>
        </div>
    )
}