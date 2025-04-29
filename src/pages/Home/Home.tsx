import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
    
    return (
        <>
            <div className="bg-red-300">
                <div className="flex w-full h-30 font-bold text-2xl text-red-900">
                    Hey Welcome to my Website
                </div>
                {/* <main>
                    <div className="bg-red-800 w-100 h-50 first:bg-red-500 text-center rounded-xl shadow-xl flex items-center justify-center dark:bg-green-400">
                        <div className="bg-red-800 w-20 h-10 rouded-x-full aspect-square"></div>
                    </div>
                    <div className="bg-red-600 w-200 h-100 rouded-x-full"></div>
                </main> */}
                {/* <div className="bg-white rounded-xl shadow-2xl w-100 h-100"></div> */}

                <div className="grid grid-cols-2 gap-5 w-200 bg-green-400">
                    <div className="bg-red-800 w-20 h-30 ring-2"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                </div>
                <button className="btn-primary text-white">Click Me</button>
            </div>
            <div className="polygon w-100 h-100 bg-blue-800"></div>
            <Sidebar/>
        </>
    );
};

export default Home;
