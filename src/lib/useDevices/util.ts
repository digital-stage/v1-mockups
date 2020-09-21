import {MediaDevice} from "../common/model.common";

export const enumerateDevices = (): Promise<{
    inputAudioDevices: MediaDevice[],
    inputVideoDevices: MediaDevice[],
    outputAudioDevices: MediaDevice[],
}> => {
    return new Promise<{
        inputAudioDevices: MediaDevice[],
        inputVideoDevices: MediaDevice[],
        outputAudioDevices: MediaDevice[]
    }>(resolve => {
        if (!navigator)
            return resolve({
                inputAudioDevices: [],
                inputVideoDevices: [],
                outputAudioDevices: [],
            });
        return navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const inputVideoDevices: MediaDevice[] = [];
                const inputAudioDevices: MediaDevice[] = [];
                const outputAudioDevices: MediaDevice[] = [];
                devices.forEach((device, index) => {
                    switch (device.kind) {
                        case "videoinput":
                            inputVideoDevices.push({
                                id: device.deviceId || (inputVideoDevices.length === 1 ? "default" : index.toString()),
                                label: device.label ? device.label : "Standard"
                            });
                            break;
                        case "audioinput":
                            inputAudioDevices.push({
                                id: device.deviceId || (inputAudioDevices.length === 1 ? "default" : index.toString()),
                                label: device.label || "Standard"
                            });
                            break;
                        default:
                            outputAudioDevices.push({
                                id: device.deviceId || (outputAudioDevices.length === 1 ? "default" : index.toString()),
                                label: device.label || "Standard"
                            });
                            break;
                    }
                });
                resolve({
                    inputAudioDevices,
                    inputVideoDevices,
                    outputAudioDevices
                })
            });
    });
}