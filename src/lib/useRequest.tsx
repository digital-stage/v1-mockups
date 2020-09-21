// @ts-nocheck
import {GroupId, StageId} from "./common/model.common";
import React, {useState} from "react";

export interface Request {
    stageId: StageId;
    groupId: GroupId;
    password: string | null;

    setRequest(stageId: StageId, groupId: GroupId, password?: string);
}

const RequestContext = React.createContext<Request>(undefined);

export const useRequest = (): Request => React.useContext<Request>(RequestContext);

export const RequestContextProvider = (props: {
    children: React.ReactNode
}) => {
    const [stageId, setStageId] = useState<StageId>();
    const [groupId, setGroupId] = useState<StageId>();
    const [password, setPassword] = useState<string>();

    return (
        <RequestContext.Provider value={{
            stageId,
            groupId,
            password,
            setRequest: (stageId, groupId, password) => {
                setStageId(stageId);
                setGroupId(groupId);
                setPassword(password);
            }
        }}>
            {props.children}
        </RequestContext.Provider>
    )
}