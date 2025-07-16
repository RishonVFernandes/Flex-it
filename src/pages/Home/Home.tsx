import Loader from "../../components/Loader/Loader";

const Home = () => {
    
    return (
        <>
            <div className="bg-red-300">
                <div className="flex w-full h-30 font-bold text-2xl text-red-900">
                    Hey Welcome to my Website
                </div>
                <Loader/>
                <div className="grid grid-cols-2 gap-5 w-200 bg-green-400">
                    <div className="bg-red-800 w-20 h-30 ring-2"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                    <div className="bg-red-800 w-20 h-30"></div>
                </div>
                <button className="btn-primary text-white">Click Me</button>
            </div>
            <div className="polygon w-100 h-100 bg-blue-800"></div>
        </>
    );
};

export default Home;
