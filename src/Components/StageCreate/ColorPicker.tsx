import React, { useEffect } from 'react';

enum ColorChipsEnum {
    ALL = "All",
    CONTRAST = "Contrast",
    PASTEL = "Pastel",
}

export type Color = {
    color: string;
    type: ColorChipsEnum;
}

const colors: Color[] = [
    { color: "#F20544", type: ColorChipsEnum.CONTRAST },
    { color: "#0B2D71", type: ColorChipsEnum.CONTRAST },
    { color: "#BFBFBF", type: ColorChipsEnum.PASTEL },
    { color: "#4D4D4D", type: ColorChipsEnum.CONTRAST },

    { color: "#F61D1D", type: ColorChipsEnum.CONTRAST },
    { color: "#FF7D26", type: ColorChipsEnum.CONTRAST },
    { color: "#31BF1D", type: ColorChipsEnum.CONTRAST },
    { color: "#2667FC", type: ColorChipsEnum.CONTRAST },

    { color: "#FF36CA", type: ColorChipsEnum.CONTRAST },
    { color: "#D9486F", type: ColorChipsEnum.PASTEL },
    { color: "#F279BC", type: ColorChipsEnum.PASTEL },
    { color: "#F2BBBB", type: ColorChipsEnum.PASTEL },

    { color: "#52C5F2", type: ColorChipsEnum.PASTEL },
    { color: "#5780F2", type: ColorChipsEnum.PASTEL },
    { color: "#4EBFAB", type: ColorChipsEnum.PASTEL },
    { color: "#A7E566", type: ColorChipsEnum.PASTEL },

    { color: "#FBD366", type: ColorChipsEnum.PASTEL },
    { color: "#EEF26C", type: ColorChipsEnum.PASTEL },
    { color: "#E59D66", type: ColorChipsEnum.PASTEL },
    { color: "#F65353", type: ColorChipsEnum.PASTEL },
]

export default function ColorPicker(props: {
    onClick: (color:Color)=>void,
    selectedChip: string,
    selectedColor: string
}) {
    const {
        onClick,
        selectedChip,
        selectedColor
    } = props;

    const [pickerColors, setColor] = React.useState(colors);

    const handleOnClick = (color:Color) =>{
        return () => onClick(color)
    }

    useEffect(() => {
        if (selectedChip === ColorChipsEnum.ALL) {
            setColor(colors);
        }
        else {
            const colorsSelected = colors.filter((color) => color.type === selectedChip);
            setColor(colorsSelected);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChip])

    return (
        <div className="ml-2 mt-2">
            {pickerColors.map((color, i) => {
                return <span
                    key={i + color.color}
                    className="d-inline-flex mx-2 my-2"
                    onClick={handleOnClick(color)}
                    style={{
                        minWidth: "24px",
                        minHeight: "24px",
                        backgroundColor: color.color,
                        borderRadius: "50%",
                        cursor: "pointer",
                        boxShadow: selectedColor === color.color ? "0px 2px 10px #121212" : "none",
                    }} />
            })}
        </div>
    )
}


