import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../store/store.ts";
import { getSocket } from "../../services/socket.ts";

type MessageType = {
    id: string;
    content: string;
    userId: number;
};
const ChatPage = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        console.log("user not found");
    }

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = getSocket();

            socketRef.current.on("connect", () => {
                console.log("✅ Socket connected:", socketRef.current?.id);
                socketRef.current?.emit("join");
            });

            socketRef.current.on("messages", (msgs: MessageType[]) => {
                setMessages(msgs);
            });

            socketRef.current.on("message", (msg: MessageType) => {
                setMessages((prev) => [...prev, msg]);
            });

            socketRef.current.on("error", (msg) => {
                console.error("Socket error:", msg);
            });
        }

        return () => {
            socketRef.current?.off("connect");
            socketRef.current?.off("messages");
            socketRef.current?.off("message");
            socketRef.current?.off("error");
        };
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const socket = getSocket();

            socket.emit("message", {
                content: newMessage,
            });
            setLoading(true);
            console.log("✅ message sent");
            setNewMessage("");
        } catch (err) {
            console.warn(
                "⚠️ Could not send message, socket not connected:",
                err
            );
        }
    };

    return (
        <>
            <div className="flex flex-col h-150 bg-gray-100">
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4 shadow-sm dark:bg-gray-700">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Chat Room
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-900 dark:text-white">
                        Welcome, {user?.username}
                    </p>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-gray-800">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.userId === user?.id
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-2 py-1 rounded-lg ${
                                        message.userId === user?.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-800 border border-gray-200"
                                    }`}
                                >
                                    {message.userId !== user?.id ? (
                                        <div className="flex items-center mb-1">
                                            <div className="w-full h-4 mr-1 text-sm">
                                                {user?.username}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center mb-1">
                                            <div className="w-full h-4 ml-2 text-sm">
                                                Me
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-lg">{message.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4 dark:bg-gray-700">
                    <div className="flex space-x-2">
                        <form
                            action=""
                            onSubmit={sendMessage}
                            className="flex w-full gap-5"
                        >
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                // onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                                placeholder="Type a message..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:dark:bg-gray-400 dark:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                            >
                                send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
