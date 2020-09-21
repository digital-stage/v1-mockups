// @ts-nocheck
import React, {useCallback, useEffect, useState} from "react";
import {Device, DeviceId, User} from "../common/model.common";
import io from "socket.io-client";
import {enumerateDevices} from "./util";
import * as Bowser from "bowser";
import {
    ClientDeviceEvents,
    ClientUserEvents,
    ServerDeviceEvents,
    ServerGlobalEvents,
    ServerUserEvents
} from "../common/events";
import {useAuth} from "../useAuth";
import {API_URL} from "../env";

export interface DeviceProps {
    socket: SocketIOClient.Socket;
    ready: boolean;
    localDevice: Device;
    devices: Device[];
    remoteDevices: Device[];
    logs: string[];
    user: User;

    updateDevice(id: DeviceId, device: Partial<Device>);

    updateUser(name: string, avatarUrl?: string);
}

const DeviceContext = React.createContext<DeviceProps>(undefined);

export const useDevices = (): DeviceProps => React.useContext<DeviceProps>(DeviceContext);

export const DeviceContextProvider = (props: {
    children: React.ReactNode
}) => {
    const {token} = useAuth();
    const [ready, setReady] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [logs, setLogs] = useState<string[]>([]);
    const [socket, setSocket] = useState<SocketIOClient.Socket>(null);
    const [localDeviceId, setLocalDeviceId] = useState<string>();
    const [localDevice, setLocalDevice] = useState<Device>();
    const [devices, setDevices] = useState<Device[]>([]);
    const [remoteDevices, setRemoteDevices] = useState<Device[]>([]);

    useEffect(() => {
        if (token) {
            console.log("TOKEN");
            if (!socket) {
                const bowser = Bowser.getParser(window.navigator.userAgent);
                const os = bowser.getOSName();
                const browser = bowser.getBrowserName();

                enumerateDevices()
                    .then(devices => {
                        log("Initializing socket");
                        devices.inputAudioDevices.forEach(device => log("Found video input device " + device.id + ": " + device.label));
                        devices.inputVideoDevices.forEach(device => log("Found audio input device " + device.id + ": " + device.label));
                        devices.outputAudioDevices.forEach(device => log("Found audio output device " + device.id + ": " + device.label));
                        const socketIO: SocketIOClient.Socket = io(API_URL, {
                            secure: process.env.NODE_ENV !== "development",
                            query: {
                                token: token,
                                device: JSON.stringify({
                                    name: browser + " (" + os + ")",
                                    canAudio: devices.inputAudioDevices.length > 0,
                                    canVideo: devices.inputVideoDevices.length > 0,
                                    inputAudioDevices: devices.inputAudioDevices,
                                    inputVideoDevices: devices.inputVideoDevices,
                                    outputAudioDevices: devices.outputAudioDevices,
                                    inputAudioDevice: devices.inputAudioDevices.find(d => d.id === "label") ? "default" : devices.inputAudioDevices.length > 0 ? devices.inputAudioDevices[0].id : undefined,
                                    inputVideoDevice: devices.inputVideoDevices.length === 1 ? devices.inputVideoDevices[0].id : "default",
                                    outputAudioDevice: devices.outputAudioDevices.find(d => d.id === "label") ? "default" : devices.outputAudioDevices.length > 0 ? devices.outputAudioDevices[0].id : undefined
                                })
                            }
                        });
                        socketIO.on("reconnect", () => {
                            log("Socket reconnected");
                        });
                        socketIO.on("disconnect", () => {
                            log("Disconnected from server, try to reconnect but reset state");
                            setDevices([]);
                            setRemoteDevices([]);
                            setLocalDeviceId(undefined);
                            setLocalDevice(undefined);
                        });
                        setSocket(socketIO);
                    });
            }
        } else {
            if (socket) {
                log("Token invalid, reset socket connection");
                socket.disconnect();
                setSocket(undefined);
            }
        }
    }, [token]);

    useEffect(() => {
        // Update local and remote devices
        if (localDeviceId) {
            const localDevice = devices.find(device => device._id === localDeviceId);
            setLocalDevice(prevState => ({
                ...prevState,
                ...localDevice
            }));
            setRemoteDevices(devices.filter(device => device._id !== localDeviceId));
        } else {
            setLocalDevice(undefined);
            setRemoteDevices(devices);
        }
    }, [devices, localDeviceId]);

    const log = useCallback((message: string) => {
        setLogs(prevState => [...prevState, message + "\n"]);
    }, []);

    const registerDeviceEvents = (socket) => {
        log("Register device changes");
        console.log("Register device changes");
        socket.on(ServerGlobalEvents.READY, () => setReady(true));
        socket.on(ServerUserEvents.USER_READY, (user) => setUser(user));
        socket.on(ServerDeviceEvents.DEVICE_ADDED, () => console.log("device-added"));
        socket.on(ServerDeviceEvents.DEVICE_ADDED, (device: Device) => setDevices(prevState => [...prevState, device]));
        socket.on(ServerDeviceEvents.DEVICE_CHANGED, (device: Device) => setDevices(prevState => prevState.map(d => d._id === device._id ? {...d, ...device} : d)));
        socket.on(ServerDeviceEvents.DEVICE_REMOVED, (device: Device) => setDevices(prevState => prevState.filter(d => d._id !== device._id)));
        socket.on(ServerDeviceEvents.LOCAL_DEVICE_READY, (device: Device) => {
            console.log("local-device-ready");
            console.log(device);
            setLocalDeviceId(device._id);
            setDevices(prevState => [...prevState, device]);
            navigator.mediaDevices.ondevicechange = () => enumerateDevices()
                .then(devices => {
                    updateDevice(device._id, {
                        canAudio: devices.inputAudioDevices.length > 0,
                        canVideo: devices.inputVideoDevices.length > 0,
                        inputAudioDevices: devices.inputAudioDevices,
                        inputVideoDevices: devices.inputVideoDevices,
                        outputAudioDevices: devices.outputAudioDevices
                    });
                });
        });
        socket.on("disconnect", () => {
            setLocalDeviceId(undefined);
            setLocalDevice(undefined);
            setRemoteDevices([]);
            setDevices([]);
            setReady(false);
        })
    }

    useEffect(() => {
        if (socket) {
            console.log("useDevice: socket changed");
            log("Socket available");
            registerDeviceEvents(socket);
        } else {
            log("Socket not available - reset devices");
            setLocalDeviceId(undefined);
            setLocalDevice(undefined);
            setRemoteDevices([]);
            setDevices([]);
            setReady(false);
        }
    }, [socket]);

    const updateDevice = useCallback((deviceId: string, device: Partial<Omit<Device, "_id">>) => {
        if (socket) {
            socket.emit(ClientDeviceEvents.UPDATE_DEVICE, {
                ...device,
                _id: deviceId
            });
        } else {
            console.error("SOCKET NOT READY");
        }
    }, [socket]);

    const updateUser = useCallback((name: string, avatarUrl?: string) => {
        if (socket) {
            socket.emit(ClientUserEvents.CHANGE_USER, {
                name: name,
                avatarUrl: avatarUrl
            });
        } else {
            console.error("SOCKET NOT READY");
        }
    }, [socket]);

    return (
        <DeviceContext.Provider value={{
            socket: socket,
            ready: ready,
            user: user,
            localDevice: localDevice,
            devices: devices,
            remoteDevices: remoteDevices,
            updateDevice: updateDevice,
            updateUser: updateUser,
            logs: logs
        }}>
            {props.children}
        </DeviceContext.Provider>
    )
}