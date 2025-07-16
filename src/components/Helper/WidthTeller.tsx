import { useEffect, useState } from "react";

const WidthTeller = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isVisible, setIsVisible] = useState(false);

    const getWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", getWidth);
        return () => window.removeEventListener("resize", getWidth);
    });
    return (
        <>
            <div
                className="w-40 h-auto bg-orange-500 fixed p-2 rounded-lg"
                onClick={() => setIsVisible(!isVisible)}
            >
                Inner Width:
                <div>
                    <p>In px: {width} px</p>
                    <p>In rem: {width * 0.0625}</p>
                </div>
                {isVisible && (
                    <div>
                        sm : 40rem (640px) md : 48rem (768px) lg : 64rem
                        (1024px) xl : 80rem (1280px) 2xl : 96rem (1536px)
                    </div>
                )}
            </div>
        </>
    );
};

export default WidthTeller;
