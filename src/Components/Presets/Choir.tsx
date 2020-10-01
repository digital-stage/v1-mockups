import React from 'react';
import { Group, ChoirGroups } from '../../Containers/Home/SelectPresetStep';

const PREVIEW_WIDTH = "150px";
const PREVIEW_HEIGHT = "90px";
const PRESET_WIDTH = "80px";
const PRESET_HEIGHT = "50px";

enum Context {
    PRESET = "preset",
    PREVIEW = "preview"
}

export default function Choir(props: { groups: Group[], context: string }) {
    const {
        groups,
        context
    } = props;
    return (
        <div
            className="d-flex"
            style={{
                width: context === Context.PRESET ? PRESET_WIDTH : PREVIEW_WIDTH,
                height: context === Context.PRESET ? PRESET_HEIGHT : PREVIEW_HEIGHT,
                backgroundColor: "black", borderRadius: "8px",
                padding: context === Context.PRESET ? "6px" : "10px"
            }}
        >
            {groups.map((group) => {
                return <div style={{
                    margin: context === Context.PRESET ? "0px 1px" : "0px 2px",
                    height: "100%",
                    backgroundColor: context === Context.PRESET ? 'white' : group.color,
                    width: group.name !== ChoirGroups.CONDUCTOR ? `calc(${context === Context.PRESET ? PRESET_WIDTH : PREVIEW_WIDTH} / ${groups.length})` : `calc((${context === Context.PRESET ? PRESET_WIDTH : PREVIEW_WIDTH} / ${groups.length}) + 25px)`,
                    borderRadius: "8px"
                }}></div>
            }
            )}
        </div>
    )
}


