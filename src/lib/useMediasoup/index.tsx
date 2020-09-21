import {useEffect, useState} from "react";
import {Device, Producer} from "../common/model.common";
import {useDevices} from "../useDevices";
import {ServerStageEvents} from "../common/events";

export interface Consumer {

}

export interface ResolvedProducer extends Producer {
    actualVolume: number;
}

export interface OVProducer extends Producer {

}

export interface AudioProducer extends ResolvedProducer {

}

export interface VideoProducer extends ResolvedProducer {

}


const useMediasoup = () => {
    const {socket, localDevice} = useDevices();
    const [lastDevice, setLastDevice] = useState<Device>();
    const [audioProducers, setAudioProducers] = useState<AudioProducer[]>([]);
    const [videoProducers, setVideoProducers] = useState<VideoProducer[]>([]);
    const [ovProducers, setOvProducers] = useState<OVProducer[]>([]);


    useEffect(() => {
        if (localDevice) {
            if (!lastDevice || localDevice.sendVideo !== lastDevice.sendVideo) {
                console.log("send video changed");
            }
            if (!lastDevice || localDevice.sendAudio !== lastDevice.sendAudio) {
                console.log("send audio changed");
            }
            if (!lastDevice || localDevice.receiveVideo !== lastDevice.receiveVideo) {
                console.log("receive video changed");
            }
            if (!lastDevice || localDevice.receiveAudio !== lastDevice.receiveAudio) {
                console.log("receive audio changed");
            }
        }
        setLastDevice(localDevice);
    }, [localDevice]);

    useEffect(() => {
        if (socket) {
            socket.on(ServerStageEvents.GROUP_ADDED, (producer: Producer) => {
                console.log("group-added");
                console.log(producer);
            });
            socket.on(ServerStageEvents.GROUP_CHANGED, (producer: Producer) => {
                console.log("group-changed");
                console.log(producer);
            });
            socket.on(ServerStageEvents.GROUP_REMOVED, (producer: Producer) => {
                console.log("group-removed");
                console.log(producer);
            });
            socket.on(ServerStageEvents.PRODUCER_ADDED, (producer: Producer) => {
                console.log("producer-added");
                console.log(producer);
            });
            socket.on(ServerStageEvents.PRODUCER_CHANGED, (producer: Producer) => {
                console.log("producer-changed");
                console.log(producer);

            });
            socket.on(ServerStageEvents.PRODUCER_REMOVED, (producerId: string) => {
                console.log("producer-removed");
                console.log(producerId);
            });
            socket.on("disconnect", () => {
                setAudioProducers([]);
                setVideoProducers([]);
                setOvProducers([]);
            })
        } else {
            setAudioProducers([]);
            setVideoProducers([]);
            setOvProducers([]);
        }
    }, [socket]);

    return {
        audioProducers,
        videoProducers,
        ovProducers
    }
}
export default useMediasoup;