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
            if(window.innerWidth > 600 ){
                containerRef.current.style.position = isFixed
                    ? "fixed"
                    : "absolute";
                containerRef.current.style.top = isFixed ? "60px" : "auto";
            }
            else{
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
        "Hello this is Rishon V Fernandes",
        "Welcome to my Website",
        "Enjoy the animation",
        "Have a look",
        "at my website",
        "I am a web developer",
        "And i love pokemon",
    ];

    const CurrentScene = scenes[index];

    return (
        <>
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
                        {phrases.map((_, i) => (
                            <section
                                className="h-[90vh] bg-cyan-100 dark:bg-gray-900"
                                key={i}
                            >
                                <div className=" pt-[15%] pl-[15%] w-60 text-3xl font-bold dark:text-teal-600/70 text-black z-90 sticky top-[100px] sm:w-150 sm:text-6xl font-display">
                                    {phrases[i]}

                                    {i == 0 && (
                                        <div className="mt-3 w-60 flex justify-between">
                                            <button className="text-lg text-black h-10 p-2 bg-teal-600/50 rounded-lg hover:bg-teal-600/90 dark:text-white">
                                                Hello
                                            </button>
                                            <button className="text-lg text-black h-10 p-2 rounded-lg outline outline-teal-800 hover:bg-teal-600/90 dark:text-white">
                                                Say Someting
                                            </button>
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
