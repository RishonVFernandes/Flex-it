import React from "react";
import styles from "./styles.module.css";
import penguins from "../../assets/penguins.jpg"

const Sudoku = () => {
    return (
        <>
        <div className={styles.background}>
            <img src={penguins} alt="" />
            <div className={styles.card}></div>
        </div>
            <div
                className={` ${styles.box} h-full flex justify-center items-center `}
            >
                <div className="w-81 h-81 border border-xl border-black grid grid-cols-3">
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                        <div className="w-9 h-9 border border-blue">8</div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                    <div className="w-27 h-27 border border-green grid grid-cols-3">
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                        <div className="w-9 h-9 border border-blue"></div>
                    </div>
                </div>

                <div>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                </div>
            </div>
        </>
    );
};

export default Sudoku;
