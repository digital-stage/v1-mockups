import React, { useEffect } from "react";
import SearchInput from "../../Components/Form/SearchInput";
import NotificationCard from "./NotificationCard";
import SearchTags from "../../Components/Form/SearchTags";

const searchTags = ["All", "Invitations", "Updates"]

const NotificationsList = (props: { onClick(i: number): void, notifications: Array<{ title: string, type: string }> }) => {
    const [list, setList] = React.useState(props.notifications);
    const [searchedWord, setSearchedWord] = React.useState("");
    const [searchedTag, setSearchedTag] = React.useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [clickedId, setclickedId] = React.useState(0);


    function onChangeHandler(e: any) {
        setSearchedWord(e.target.value);
        setSearchedTag("")
    }

    function clearInput() {
        setSearchedWord("")
        setSearchedTag("")
    }


    useEffect(() => {
        let filteredList;

        if (searchedWord.length > 0) {
            console.log("he re");
            filteredList = props.notifications.filter(el => el.title.toLowerCase().includes(searchedWord.toLowerCase()))
            setList(filteredList)
        }
        if (searchedTag.length > 0) {
            filteredList = props.notifications.filter(el => el.type.toLowerCase().includes(searchedTag.toLowerCase()))
            setSearchedWord(searchedTag)
            setList(filteredList)
        }

        if (searchedWord.length === 0 && searchedTag.length === 0) {
            setList(props.notifications)
        }

        if (searchedTag === "All") {
            setList(props.notifications)
            setSearchedWord("")
            setSearchedTag("")
        }

    }, [searchedWord, searchedTag, props.notifications]);


    return (
        <div className="notifications-list">
            <div className="search-section">
                <div style={{ display: "inline-block" }}>
                    <SearchInput list={list} onChange={onChangeHandler} clear={clearInput} selected={searchedWord} placeholder="Search notifications" />
                    <div className="mt-2 ml-2 text-left">
                        {searchTags.map(tag => { return <SearchTags tag={tag} onClick={() => setSearchedTag(tag)} /> })}
                    </div>
                </div>
            </div>
            <div className="notifications-section">
                <div> {list.map((option: any, i) => {
                    return (
                        <div onClick={() => { props.onClick(i); setclickedId(i) }} key={option.title}
                        >
                            <NotificationCard notification={option} />
                        </div>
                    )
                })}</div>
            </div>
        </div>)
};

export default NotificationsList;