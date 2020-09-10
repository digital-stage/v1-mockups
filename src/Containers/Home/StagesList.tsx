import React, { useEffect } from "react";
import SearchInput from "../../Components/Form/SearchInput";
import StageIcon from "../../assets/images/stage-icon.png"
import UserIcon1 from "../../assets/images/user-img-1.png"
import UserIcon2 from "../../assets/images/user-img-2.png"
import UserIcon3 from "../../assets/images/user-img-3.png"
import StageCard from "./StageCard";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from "@material-ui/core";
import ButtonStyled from "../../Components/Form/Button";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const stages = [
    { title: 'Bulshemier Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, corporis." },
    { title: 'National Theatre', mineStage: false, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, corporis." },
    { title: 'Theatre National Royal', mineStage: true, image: StageIcon, online: false, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, corporis." },
    { title: 'The Old Theatre', mineStage: false, image: StageIcon, online: false, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, corporis." },
    { title: 'Lyceum Theatre', mineStage: true, image: StageIcon, online: true, users: [{ userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }, { userPhoto: UserIcon1 }, { userPhoto: UserIcon2 }, { userPhoto: UserIcon3 }], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, corporis." },
    // { title: 'Fortune Theatre', mineStage: false, image: StageIcon, online: false },
    // { title: 'Royal Opera House', mineStage: true, image: StageIcon, online: true },
    // { title: "Dominion Theatre", mineStage: false, image: StageIcon, online: true },
    // { title: 'The London Palladium', mineStage: true, image: StageIcon, online: false }
];

const StagesList = (props: { onClick(i: number): void }) => {
    const [list, setList] = React.useState(stages);
    const [selected, setSelected] = React.useState("");
    const [checkedMyStage, setCheckedMyStage] = React.useState(true);
    const [checkedJoindedStages, setCheckedJoinedStages] = React.useState(true);
    const [clickedId, setclickedId] = React.useState(0);

    const handleMySatgeClick = () => {
        setCheckedMyStage((prev) => !prev);
    };

    const handleJoindeStagesClick = () => {
        setCheckedJoinedStages((prev) => !prev);
    };

    function onChangeHandler(e: any) {
        setSelected(e.target.value);
    }

    function clearInput() {
        setSelected("")
    }

    useEffect(() => {
        if (selected.length > 0) {
            let filteredList = stages.filter(el => el.title.toLowerCase().includes(selected.toLowerCase()))
            setList(filteredList)
        }
        if (selected.length === 0) {
            setList(stages)
        }

    }, [selected]);


    return <div className="stages-list">
        <div className="search-section">
            <div style={{ display: "inline-block" }}>
                <SearchInput list={list} onChange={onChangeHandler} clear={clearInput} selected={selected} placeholder="Search stages" />
            </div>
        </div>
        <div className="stages-list">
            <div className="d-flex">
                <h5 className="pt-3 mb-3 title">My stages</h5>
                <span className="pt-2 pl-2" onClick={handleMySatgeClick}>{!checkedMyStage ? <ExpandMoreIcon /> : <ExpandLessIcon />}</span>
            </div>
            <div> {list.map((option, i) => {
                return (
                    <div onClick={() => { props.onClick(i); setclickedId(i) }} className={`clickable ${clickedId === i ? 'left-border' : 'left-border-normal'}`} key={option.title}>
                        <Collapse in={checkedMyStage}>
                            {option.mineStage &&
                                <StageCard stage={option}/>
                            }</Collapse>
                    </div>
                )
            })}</div>
            <div className="d-flex">
                <h5 className="pt-3 mb-3 title">Joined stages</h5>
                <span className="pt-2 pl-2" onClick={handleJoindeStagesClick}>{!checkedJoindedStages ? <ExpandMoreIcon /> : <ExpandLessIcon />}</span>
            </div>
            <div> {list.map((option, i) => {
                return (
                    <div onClick={() => { props.onClick(i); setclickedId(i) }} className={`clickable ${clickedId === i ? 'left-border' : 'left-border-normal'}`}  key={option.title}>
                        <Collapse in={checkedJoindedStages}>
                            {!option.mineStage && <StageCard stage={option} />}
                        </Collapse>
                    </div>
                )
            })}</div>
        </div>
        <div className="float-right mb-2 mr-4">
            <ButtonStyled
                className="button-red"
                text="New stage"
                type="submit"
                startIcon={<AddIcon />}
            />
            <ButtonStyled
                className="button-white ml-3"
                text="Enter link"
                type="submit"
                startIcon={<EditOutlinedIcon />}
            />
        </div>
    </div>;
};

export default StagesList;