import React, {
    useState,
    // useEffect,
    useContext,
    createContext
} from "react";
import { IStageInfo, Preset, choir, theatre } from "../js/CreateStageUtils";
import Stage from '../assets/images/stage.png';

interface Stage {
    info: IStageInfo,
    handleSetInfo(info: IStageInfo): void,
    image: string,
    handleSetImage(image: string): void,
    preset: string,
    handleSetPreset(preset: string): void,
    setStageGroups(groups: string): void,
    stageGroups: any,
    resetCreateStageDialog():void
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
    const [info, setInfo] = useState<IStageInfo>({ name: "Test stage" });
    const [image, setImage] = React.useState<string>(Stage);
    const [preset, setPreset] = React.useState<string>(Preset.CHOIR);
    const [stageGroups, setStageGroups] = React.useState<any>({ choir, theatre })


    const handleSetInfo = (stageInfo: IStageInfo) => {
        setInfo(stageInfo)
    }

    const handleSetImage = (stageImage: string) => {
        setImage(stageImage)
    }

    const handleSetPreset = (selectedPreset: string) => {
        setPreset(selectedPreset)
    }

    const resetCreateStageDialog = () => {
        setInfo({ name: "Test stage" })
        setImage(Stage)
        setPreset(Preset.CHOIR)
        setStageGroups({ choir, theatre })
    }

    // useEffect(() => {}, []);

    return {
        info,
        image,
        preset,
        stageGroups,
        handleSetInfo,
        handleSetImage,
        handleSetPreset,
        setStageGroups,
        resetCreateStageDialog,
    };
}
