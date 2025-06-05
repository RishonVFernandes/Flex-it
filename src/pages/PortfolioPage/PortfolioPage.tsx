import { Suspense, useEffect, useState } from "react";
import { toggleSidebar } from "../../store/sidebarSlice";
import { useDispatch } from "react-redux";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stats } from "@react-three/drei";
// import Buttons from "../../components/NewCube/Buttons.tsx";
import SolvedCube from "../../components/NewCube/SolvedCube.tsx";
import CubeScene1 from "../../components/NewCube/CubeScene1.tsx";
import CubeScene2 from "../../components/NewCube/CubeScene2.tsx";
import CubeScene3 from "../../components/NewCube/CubeScene3.tsx";
import CubeScene4 from "../../components/NewCube/CubeScene4.tsx";

const scenes = [CubeScene4, CubeScene3, CubeScene2, CubeScene1, SolvedCube];
// console.log({PrevioCube, PreviCube, PrevCube, PreCube, Cube})
const PortfolioPage = () => {
    const dispatch = useDispatch();

    // const scrollTimeout = useRef<number | null>(null);
    const [index, setIndex] = useState(0);

    // useEffect(() => {
    //     const handleScroll = (e: WheelEvent) => {
    //         e.preventDefault();
    //         if (scrollTimeout.current) return;

    //         scrollTimeout.current = setTimeout(() => {
    //             setIndex((prev: number) => {
    //                 if (e.deltaY > 0) {
    //                     return Math.min(prev + 1, scenes.length - 1);
    //                 } else {
    //                     return Math.max(prev - 1, 0);
    //                 }
    //             });
    //             scrollTimeout.current = null;
    //         }, 500);
    //     };
    //     window.addEventListener("wheel", handleScroll, { passive: false });
    //     return () => window.removeEventListener("wheel", handleScroll);
    // }, []);

    // let CurrentScene = scenes[index];
    // if (CurrentScene >= scenes[scenes.length]) CurrentScene = Cube;
    // const totalScenes = scenes.length;

    useEffect(() => {
        const handleScroll = () => {
            const totalScenes = scenes.length;
            const sectionHeight = window.innerHeight * 0.25; // 50vh in pixels
            const totalHeight = sectionHeight * totalScenes;

            // Compute a scroll ratio from 0 to 1
            const scrollY = window.scrollY;
            const scrollProgress = scrollY / totalHeight;

            // Map scroll progress to scene index
            const newIndex = Math.min(
                totalScenes - 1,
                Math.floor(scrollProgress * totalScenes)
            );

            setIndex(newIndex);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const CurrentScene = scenes[index];
    return (
        <>
            <header className="bg-black">
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
            <main className="flex h-full bg-gray-700 ">
                <div className="w-150  h-100 bg-gray-800 fixed top-0">
                    <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Suspense fallback={null}>
                            {/* <Environment preset="forest" /> */}
                        </Suspense>
                        <CurrentScene />
                        {/* <Cube/> */}
                        {/* <OrbitControls /> */}
                        {/* <Stats /> */}
                    </Canvas>
                </div>
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        padding: "8px",
                        background: "rgba(0, 0, 0, 0.6)",
                        color: "lime",
                        fontSize: "14px",
                        zIndex: 1000,
                        fontFamily: "monospace",
                    }}
                >
                    ScrollY: {scrollY}px
                    <br />
                    Scene Index: {index}
                </div>
                {/* <div className="w-50 text-2xl font-bold text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptate quasi culpa ducimus dignissimos dolore qui illo
                    corporis architecto iusto rerum consequuntur voluptatibus
                    explicabo, ipsa suscipit animi voluptatum in sed officia
                    praesentium at eaque quam. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Neque eius mollitia tempore
                    laborum omnis similique maxime assumenda quae qui voluptas,
                    facilis eveniet ducimus, numquam aperiam quod quis
                    necessitatibus minus. Obcaecati error, optio accusamus sint
                    possimus non quam, nesciunt quisquam iste tempora itaque
                    asperiores atque, voluptatum laudantium sit animi unde.
                    Assumenda aspernatur molestiae ad ab quaerat, rem dicta,
                    vero voluptates sit, necessitatibus cupiditate totam
                    repellendus repudiandae dolores. Assumenda magnam laboriosam
                    dolor? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam laboriosam nulla iste ducimus perspiciatis iure quaerat quod laudantium impedit aspernatur asperiores et amet delectus quis repudiandae, unde esse consequuntur expedita sint dolorum ipsa mollitia neque soluta recusandae! Eius in repellat laborum illum sapiente aut ipsa, debitis vitae omnis numquam, rerum sit minus at dolore sunt eveniet.
                </div> */}
                <div className="h-500 w-500 bg-gray-900">
                    <div style={{ height: '50px' }}>
                        {[...Array(5)].map((_, i) => (
                            <section
                                key={i}
                                style={{
                                    height: "50vh",
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                <h1
                                    style={{
                                        textAlign: "center",
                                        paddingTop: "20vh",
                                    }}
                                >
                                    Scroll Section {i + 1}
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
