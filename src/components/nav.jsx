import React, {useContext} from "react";
import { productContext } from "./context";

export default function Nav (){
    const {
        currentDate,
        setCurrentDate,
        currentMonth,
        currentYear,
        menu,
    } = useContext(productContext);
    
    // SET NEW CURRENT DATE BASED ON DIRECTION CLICKED
    // WHICH THEN TRIGGERS SETWEEK IN GLOBAL CONTEXT API
    const newWeek = (direction) => {
        let firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
        if (direction === "<") {
             firstDayOfWeek -= 7;
            setCurrentDate(new Date(currentDate.setDate(firstDayOfWeek)));
        } else {
            firstDayOfWeek += 7;
            setCurrentDate(new Date(currentDate.setDate(firstDayOfWeek)));
        }
    }
    
 return (
     <>
        <nav>
            <h1 className="text-5xl font-medium text-gray-500">
                {`${currentMonth} ${currentYear}`}
             </h1>
             <div>
                <button 
                    className="
                    bg-tranparent 
                    w-max 
                    text-gray-400
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:text-white" 
                    onClick={() => newWeek("<")}>
                    <svg 
                        className="w-8 h-8" 
                        data-darkreader-inline-fill="" 
                        data-darkreader-inline-stroke="" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M15 19l-7-7 7-7">
                            </path>
                    </svg>
                </button>
                <button 
                    className="
                    bg-tranparent 
                    w-max 
                    text-gray-400
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:text-white"
                    onClick={() => newWeek(">")}>
                    <svg 
                        className="w-8 h-8" 
                        data-darkreader-inline-fill="" 
                        data-darkreader-inline-stroke="" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M9 5l7 7-7 7">

                            </path>
                    </svg>
                </button>
                <button
                    className="
                    option 
                    bg-tranparent 
                    w-max 
                    text-gray-400
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:text-white
                    px-3
                    " 
                    onClick={menu}>
                <svg 
                    className="w-8 h-8" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1
                             1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 
                             1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
                        </path>
                </svg>
                </button>
             </div>
        </nav>
     </>
 )
}