import React, { useEffect } from 'react';

enum ColorChipsEnum {
    ALL = "All",
    CONTRAST = "Contrast",
    PASTEL = "Pastel",
}

type Color = {
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
    { color: "#A7E566", type: ColorChipsEnum.PASTEL },
    { color: "#F65353", type: ColorChipsEnum.PASTEL },
]

export default function ColorPicker(props: { onClick: any, selectedChip: string, selectedColor:string }) {
    const [pickerColors, setColor] = React.useState(colors)

    const {
        onClick,
        selectedChip,
        selectedColor
    } = props;

    useEffect(() => {
        console.log(selectedChip, pickerColors)
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
            {pickerColors.map(color => {
                return <span
                    className="d-inline-flex mx-2 my-2"
                    onClick={() => onClick(color)}
                    style={{
                        minWidth: "24px",
                        minHeight: "24px",
                        backgroundColor: color.color,
                        borderRadius: "50%",
                        // boxShadow: "0px 5px 30px #3C3C3C",
                        cursor: "pointer",
                        // border: selectedColor === color.color ? "1px solid #121212" : "0px",
                        boxShadow: selectedColor === color.color ? "0px 2px 10px #121212" : "none",
                    }}></span>
            })}
        </div>
    )
}


