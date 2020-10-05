import React, { useEffect } from 'react';
import Icons from '../Icons/Icons';

export enum IconChipsEnum {
    ALL = "All",
    CHOIR = "Choir",
    ORCHESTRA = "Orchestra",
    BAND = "Band",
    THEATRE = "Theatre",
    DANCE = "Dance",
    INSTRUMENTS = "Instruments",
    MISC = "Misc"
}

type Icon = {
    name: string;
    type: string[];
}

const icons: Icon[] = [
    { name: "choir-tenor", type: [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA] },
    { name: "choir-sopran", type: [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA] },
    { name: "choir-alto", type: [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA] },
    { name: "choir-bass", type: [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA] },
    { name: "orchestra-conductor", type: [IconChipsEnum.ALL, IconChipsEnum.CHOIR, IconChipsEnum.ORCHESTRA] },
    { name: "orchestra-woodwinds", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-piano", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-flute", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-brass", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-bowed", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-percussion", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "orchestra-plug", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-guitar", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-acoustic", type: [IconChipsEnum.ALL, IconChipsEnum.ORCHESTRA, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-drums", type: [IconChipsEnum.ALL, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-vocals", type: [IconChipsEnum.ALL, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-keys", type: [IconChipsEnum.ALL, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "band-synth", type: [IconChipsEnum.ALL, IconChipsEnum.BAND, IconChipsEnum.INSTRUMENTS] },
    { name: "theatre-director", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC, IconChipsEnum.DANCE] },
    { name: "theatre-ensemble", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC] },
    { name: "theatre-actor", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC] },
    { name: "misc-tech", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC] },
    { name: "misc-teacher", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC, IconChipsEnum.DANCE] },
    { name: "misc-diverse", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC, IconChipsEnum.DANCE] },
    { name: "dance-street", type: [IconChipsEnum.ALL, IconChipsEnum.THEATRE, IconChipsEnum.MISC, IconChipsEnum.DANCE] },
    { name: "dance-modern", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
    { name: "dance-ballet", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
    { name: "dance-jazz", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
    { name: "dance-salsa", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
    { name: "dance-tap", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
    { name: "dance-ballroom", type: [IconChipsEnum.ALL, IconChipsEnum.DANCE] },
]

export default function IconPicker(props: {
    onClick: (icon:string)=>void,
    selectedChip: string,
    selectedIcon: string
}) {
    const {
        onClick,
        selectedChip,
        selectedIcon
    } = props;
    const [pickerIcons, setIcons] = React.useState(icons)

    const handleOnClick = (icon:string) =>{
        return () => onClick(icon)
    }

    useEffect(() => {
        const iconsSelected = icons.filter((icon) => icon.type.includes(selectedChip));
        setIcons(iconsSelected);
    }, [selectedChip])

    return (
        <div className="ml-2 mt-2">
            {pickerIcons.map(icon => {
                return <Icons
                    key={icon.name}
                    title={icon.name.split('-')[1].charAt(0).toUpperCase() + icon.name.split('-')[1].slice(1)}
                    className="d-inline-flex my-2"
                    onClick={handleOnClick(icon.name)}
                    width={40}
                    height={40}
                    icon={icon.name}
                    color={selectedIcon === icon.name ? "#BFBFBF" : "white"}
                    style={{
                        cursor: "pointer",
                        // boxShadow: selectedIcon === icon.name ? "0px 2px 10px #282828" : "none",
                        // borderBottom: selectedIcon === icon.name ? "1px solid #BFBFBF" : "0px",
                        // borderRadius: "50%"
                    }}
                />
            })}
        </div>
    )
}


