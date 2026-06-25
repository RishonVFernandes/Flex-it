import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
import SolvedCube from "../../components/NewCube/SolvedCube.tsx";
import CubeScene1 from "../../components/NewCube/CubeScene1.tsx";
import CubeScene2 from "../../components/NewCube/CubeScene2.tsx";
import CubeScene3 from "../../components/NewCube/CubeScene3.tsx";
import CubeScene4 from "../../components/NewCube/CubeScene4.tsx";
import CubeScene5 from "../../components/NewCube/CubeScene5.tsx";
import CubeScene6 from "../../components/NewCube/CubeScene6.tsx";
import CubeScene7 from "../../components/NewCube/CubeScene7.tsx";
import CubeScene8 from "../../components/NewCube/CubeScene8.tsx";
import CubeScene9 from "../../components/NewCube/CubeScene9.tsx";
import CubeScene10 from "../../components/NewCube/CubeScene10.tsx";
import Footer from "../../components/Footer/Footer.tsx";

// R',U',R,U,F',L',D,R,B2,U,D
const scenes = [
    CubeScene10,
    CubeScene9,
    CubeScene8,
    CubeScene7,
    CubeScene6,
    CubeScene5,
    CubeScene4,
    CubeScene3,
    CubeScene2,
    CubeScene1,
    SolvedCube,
];

const PortfolioPage = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScenes = scenes.length;
            const sectionHeight = window.innerHeight * (1 / 2); // 50vh in pixels
            const totalHeight = sectionHeight * totalScenes;

            // Compute a scroll ratio from 0 to 1
            const scrollY = window.scrollY;
            const scrollProgress = scrollY / totalHeight;

            if (!containerRef.current) return;
            const isFixed = scrollY > 270;
            if (window.innerWidth > 600) {
                containerRef.current.style.position = isFixed
                    ? "fixed"
                    : "absolute";
                containerRef.current.style.top = isFixed ? "60px" : "auto";
            }
            else {
                containerRef.current.style.position = "fixed"
            }
            // containerRef.current.style.right = isFixed ? "40px": "40px";

            // Map scroll progress to scene index
            const newIndex = Math.min(
                totalScenes - 1,
                Math.floor(scrollProgress * totalScenes)
            );
            // console.log(scrollY)
            if (index < 10) {
                setIndex(newIndex);
            } else {
                setIndex(10);
                if (scrollY == 0) {
                    setTimeout(() => {
                        setIndex(0);
                    }, 1000);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [index]);

    const phrases = [
        { text: "Goodmorning people", color: "#ff6b6b" },
        { text: "Welcome to the Archives", color: "#4d96ff" },
        { text: "Do hang out", color: "#6bcB77" },
        { text: "till the end..", color: "#ffd93d" },
        { text: "at my website", color: "#845ec2" },
        { text: "THats It....", color: "#ff9671" },
        { text: "See U Later. Goodnight", color: "#2c2c2c" },
    ];

    const CurrentScene = scenes[index];

    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token: string = 'BQBIgR0FXs6BVaJ-2QPW8MKvGNlzeBV9g6k41FDPzjlj2108xR87hx2Q2U34upSTQCkwPQf8FV-Kvd5BQuHIC20_T-XIuAp1e7bREhMfENWADC-hbnOik3qukY3wntDfKRIGC6PMu4eygDL62LA2UC50ImWVqSBHPqTlCUa4KwA6ki7UVtw38m3W1gGs_w8OsP3szJPR6_FmAMKVA8JkMcaTq_uMnAIIc9ZxBkMh2-v9E7p91l_B6QQdBzuUkdNtAdBSYK7JMfX3d7fp6onnPhirfPB4RSEKRUZqgtQKylncUb821z3KnQSxGqSai0FiM6YQ6FY';

    interface Artist {
        id: string;
        name: string;
    }

    interface Track {
        id: string;
        name: string;
        artists: Artist[];
    }

    interface TopTracksResponse {
        items: Track[];
    }

    async function fetchWebApi<T>(
        endpoint: string,
        method: string,
        body?: unknown
    ): Promise<T> {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) {
            throw new Error(`Spotify API Error: ${res.status} ${res.statusText}`);
        }

        return (await res.json()) as T;
    }

    async function getTopTracks(): Promise<Track[]> {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        const data = await fetchWebApi<TopTracksResponse>(
            "v1/me/top/tracks?time_range=long_term&limit=5",
            "GET"
        );

        return data.items;
    }

    async function playSong() {
        try {
            const topTracks = await getTopTracks();

            console.log("get songs")
            topTracks.forEach(({ name, artists }) => {
                console.log(
                    `${name} by ${artists.map((artist) => artist.name).join(", ")}`
                );
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <script src="https://sdk.scdn.co/spotify-player.js"></script>

            <main className=" ">
                <div
                    className={` w-[70vw] h-100 right-0 bottom-0 absolute z-1 sm:w-[60vw]`}
                    ref={containerRef}
                >
                    <Canvas
                        camera={{ position: [4, 4, 4], fov: 60 }}
                        ref={canvasRef}
                    >
                        <ambientLight intensity={0.9} />

                        <pointLight position={[10, 10, 10]} />
                        <Suspense fallback={"loading"}>
                            {/* <Environment preset="sunset" /> */}
                        </Suspense>
                        <CurrentScene />
                        {/* <CubeScene10/> */}
                        {/* {index === scenes.length - 1 && (
                            <OrbitControls enableZoom={false} />
                        )} */}
                        {/* <OrbitControls/> */}
                    </Canvas>
                </div>

                <div className="z-2">
                    <div className="" style={{ height: "60px" }}>
                        {phrases.map((phrases, i) => (
                            <section
                                className="h-[90vh] bg-cyan-100"
                                style={{backgroudColor: phrases.color}}
                                key={i}
                            >
                                <div className=" pt-[15%] pl-[15%] w-60 text-3xl font-bold dark:text-teal-600/70 text-black z-90 sticky top-[100px] sm:w-150 sm:text-6xl font-display">
                                    {phrases.text}

                                    {i == 0 && (
                                        <div className="mt-3 w-60 flex justify-between">
                                            <button
                                                className="text-lg text-black h-10 p-2 bg-teal-600/50 rounded-lg hover:bg-teal-600/90 dark:text-white"
                                                onClick={() => { playSong(); }}
                                            >
                                                Play a song
                                            </button>
                                            <button className="text-lg text-black h-10 p-2 rounded-lg outline outline-teal-800 hover:bg-teal-600/90 dark:text-white">
                                                Say Someting
                                            </button>
                                            {/* <div className="display-none">
                                                <input type="text" />
                                            </div> */}
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}
                        <footer>
                            <Footer />
                        </footer>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PortfolioPage;
