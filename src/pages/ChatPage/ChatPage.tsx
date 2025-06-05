import React from "react";

type Album = {
    title: string;
    artist: string;
    releaseYear? : number;
    genre: {
        parentGanre?: string;
        subGenre?: string; 
    };
};

type AlbumDetail = Pick<Album, "artist"|"title">

type ModelNames = | "apple" | "mango" | "orange" | (string & {})
const model : ModelNames = "hello"
const ChatPage = () => {
    const handleChat = async () => {
        try {
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <h1>User 1</h1>
            </div>
            <div>
                <form action="" onSubmit={handleChat}>
                    <input
                        type="text"
                        className="border border-2xl border-blue-800"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
};

export default ChatPage;
