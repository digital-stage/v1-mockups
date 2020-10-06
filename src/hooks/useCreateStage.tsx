import React, { useState, useEffect, useContext, createContext } from "react";
import { IStageInfo } from "../js/CreateStageUtils";
import Stage from '../assets/images/stage.png';

interface Stage {
    info: IStageInfo,
    handleSetInfo(info: IStageInfo): void,
    image:string,
    handleSetImage(image: string): void,
}

const createStageContext = createContext<Stage>(undefined!);

export function ProvideCreateStage({ children }: any) {
    const stage: Stage = useProvideCreateStage();
    return <createStageContext.Provider value={stage}>{children}</createStageContext.Provider>;
}

export const useCreateStage = () => {
    return useContext(createStageContext);
};

function useProvideCreateStage() {
    const [info, setInfo] = useState<IStageInfo>({ name: "" });
    const [image, setImage] = React.useState<string>(Stage)
    

    const handleSetInfo = (stageInfo: IStageInfo) => {
        setInfo(stageInfo)
    }

    const handleSetImage = (stageImage:string)=>{
        setImage(stageImage)
    }

    // useEffect(() => {}, []);

    return {
        info,
        image,
        handleSetInfo,
        handleSetImage
    };
}
