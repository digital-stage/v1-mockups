import React from 'react';
import { Group, TheatreGroups } from '../../Containers/Home/CreateStagePresetStep';

const PREVIEW_WIDTH = "150px";
const PREVIEW_HEIGHT = "90px";
const PRESET_WIDTH = "80px";
const PRESET_HEIGHT = "50px";

enum Context {
    PRESET = "preset",
    PREVIEW = "preview"
}

export default function Theatre(props: { groups: Group[], context: string }) {
    const {
        groups,
        context
    } = props;
    return (
        <div className="d-flex flex-column" style={{ width: context === Context.PRESET ? PRESET_WIDTH : PREVIEW_WIDTH, height: context === Context.PRESET ? PRESET_HEIGHT : PREVIEW_HEIGHT, backgroundColor: "black", borderRadius: "8px", padding: context === Context.PRESET ? "6px" : "10px" }}>
            {groups.map((group) => {
                return <div style={{
                    margin: context === Context.PRESET ? "1px 0px" : "2px 1px",
                    width: "100%",
                    backgroundColor: context === Context.PRESET ? 'white' : group.color,
                    height: group.name !== TheatreGroups.DIRECTOR ? `calc(${context === Context.PRESET ? PRESET_HEIGHT : PREVIEW_HEIGHT} / ${groups.length})` : `calc((${context === Context.PRESET ? PRESET_HEIGHT : PREVIEW_HEIGHT} / ${groups.length}) + 25px)`,
                    borderRadius: "8px"
                }}></div>
            }
            )}
        </div>
    )
}


