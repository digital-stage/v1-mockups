import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import Input from "../../Components/Form/Input";
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const theme = createMuiTheme({});

theme.overrides = {
    MuiOutlinedInput: {
        root: {
            "&$focused $notchedOutline": {
                borderColor: "#8A8A8A",
                borderWidth: 2,
            },
        },
    },
};


const SearchInput = (props: { list: Array<{ title: string }>, onChange: any, clear: () => void, selected: string, style?: Object }) => {
    return (
        <div style={{ margin: "auto 0", color: "white" }}>
            <Input
                required
                name="search"
                placeholder="Search stage"
                type="text"
                id="search"
                value={props.selected}
                onInputChange={props.onChange}
                InputProps={{
                    endAdornment: (props.selected.length > 0) && <IconButton
                        aria-label="clear search"
                        onClick={props.clear}
                        edge="end"
                    >
                        <ClearIcon />
                    </IconButton>
                }}
            />
            <SearchIcon style={{ marginTop: "25px", marginLeft:"15px"}} />
        </div>
    );
};

export default SearchInput;