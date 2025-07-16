import {io, Socket} from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
    if(!socket){
        socket = io("http://localhost:3000", {
            withCredentials: true,
        });

        socket.on("connect", () => {
            console.log("Socket connected", socket?.id);
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connection error", error);
        });
    }

    return socket;
}

export const waitForSocketConnection = (): Promise<Socket> => {
    const socket = getSocket();

    return new Promise((resolve, reject) => {
        if (socket.connected) return resolve(socket);

        const timeout = setTimeout(() => {
            reject(new Error("Socket connection timeout"));
        }, 3000); // wait max 3s

        socket.on("connect", () => {
            clearTimeout(timeout);
            resolve(socket);
        });

        socket.on("connect_error", (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
};