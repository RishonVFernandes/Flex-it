import { Suspense, useEffect, useRef, useState } from "react";
import { toggleSidebar } from "../../store/sidebarSlice";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
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
    const dispatch = useDispatch();

    const canvasRef = useRef(null);

    const [index, setIndex] = useState(0);
    // const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScenes = scenes.length;
            const sectionHeight = window.innerHeight * (1 / 4); // 50vh in pixels
            const totalHeight = sectionHeight * totalScenes;

            // Compute a scroll ratio from 0 to 1
            const scrollY = window.scrollY;
            const scrollProgress = scrollY / totalHeight;

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
                        console.log('hello')
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
            <header className="bg-black sticky top-0 z-10">
                <div className="flex justify-between items-center bg-blue-400 h-15 px-5">
                    <div>LOGO</div>
                    <nav className="">
                        <ul className="flex gap-20">
                            {/* <li onClick={toggleSidebar}>Home</li> */}
                            <li onClick={() => dispatch(toggleSidebar())}>
                                Home
                            </li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Settings</li>
                        </ul>
                    </nav>
                    <div className="flex gap-10">
                        <button className="rounded-full outline outline-blue-900 px-2 py-1 hover:bg-blue-900 hover:text-red-100">
                            Sign Up
                        </button>
                        <button className="bg-mint-500">Log In</button>
                    </div>
                </div>
            </header>
            <main className=" h-200 bg-gray-800 relative p-10 ">
                <div className="w-150 h-100  fixed right-0 z-11">
                    <Canvas
                        camera={{ position: [5, 5, 5], fov: 60 }}
                        ref={canvasRef}
                    >
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Suspense fallback={null}>
                            {/* <Environment preset="forest" /> */}
                        </Suspense>
                        <CurrentScene />
                        {/* <CubeScene10/> */}
                        {/* <OrbitControls /> */}
                    </Canvas>
                </div>
                {/* <div className="w-100 h-50 text-6xl font-bold text-gray-500 z-90">
                    Hello ,THis is Rishon V Fernandes
                </div>
                <div className="w-100 h-50 text-6xl font-bold text-gray-500 z-99">
                    Welcome to my Website Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Porro aspernatur nam veritatis accusamus
                    ex facere, neque repellat suscipit repudiandae et cumque
                    harum perspiciatis nemo fugiat labore voluptatem aut libero
                    ab eius explicabo officiis, dignissimos eveniet quod ipsum.
                    Perferendis ullam nulla dolor assumenda rem voluptates
                    nostrum.
                </div> */}

                <div className="bg-gray-700 z-99">
                    <div style={{ height: "60px" }}>
                        {phrases.map((_, i) => (
                            <section
                                key={i}
                                style={{
                                    height: "90vh",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                <h1 className="w-100 h-50 text-6xl font-bold text-gray-500 z-90">
                                    {phrases[i]}
                                </h1>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <footer></footer>
        </>
    );
};

export default PortfolioPage;
