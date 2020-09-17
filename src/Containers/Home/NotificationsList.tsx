import React, { useEffect } from "react";
import SearchInput from "../../Components/Form/SearchInput";
import NotificationCard from "./NotificationCard";
// import SearchTags from "../../Components/Form/SearchTags";
import AvatarImg from "../../assets/images/Avatar.png";
import { Chip, Avatar } from "@material-ui/core";


const searchTags = ["All", "Invitations", "Updates"]

const NotificationsList = (props: { onClick(i: number): void, notifications: Array<{ title: string, type: string }> }) => {
    const [list, setList] = React.useState(props.notifications);
    const [searchedWord, setSearchedWord] = React.useState("");
    const [searchedTag, setSearchedTag] = React.useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clickedId, setclickedId] = React.useState(0);


    function onChangeHandler(e: any) {
        setSearchedWord(e.target.value);
    }

    function clearInput() {
        setSearchedWord("")
    }


    useEffect(() => {
        if (searchedWord) {
            let filteredList;
            if(!searchedTag){
            filteredList = props.notifications.filter(el => el.title.toLowerCase().includes(searchedWord.toLowerCase()))}
            else {
            filteredList = list.filter(el => el.title.toLowerCase().includes(searchedWord.toLowerCase()))
            }
            setList(filteredList);
        }

        if (searchedTag && !searchedWord) {
            const filteredListByTag = props.notifications.filter(el => el.type.toLowerCase().includes(searchedTag.toLowerCase()))
            setList(filteredListByTag)
        }

        if (searchedWord.length === 0 && searchedTag === "All") {
            setList(props.notifications)
        }
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedWord, searchedTag, props.notifications]);

    return (
        <div className="notifications-list">
        <h5 style={{color:"white", textAlign:"left", padding:"20px 20px"}}>Notifications</h5>
            <div className="search-section">
                <div style={{ display: "inline-block" }}>
                    <SearchInput list={list} onChange={onChangeHandler} clear={clearInput} selected={searchedWord} placeholder="Search notifications" />
                    <div className="mt-2 ml-2 text-left">
                        {searchTags.map((tag, i) => { 
                            return <Chip 
                            size="medium" 
                            variant="outlined" 
                            avatar={<Avatar src={AvatarImg} />} 
                            label={tag}
                            className="mr-2"
                            onClick={() => setSearchedTag(tag)}
                            key={tag + i}
                            style={searchedTag === tag ? {backgroundColor:"#F20544", color:"white"} : {backgroundColor:"white"}}
                            />
                            // <SearchTags tag={tag} onClick={() => setSearchedTag(tag)} /> 
                            })}
                    </div>
                </div>
            </div>
            <div className="notifications-section">
                <div> {list.map((option: any, i) => {
                    return (
                        <div onClick={() => { props.onClick(i); setclickedId(i) }} key={option.title + i}
                        >
                            <NotificationCard notification={option} />
                        </div>
                    )
                })}</div>
            </div>
        </div>)
};

export default NotificationsList;