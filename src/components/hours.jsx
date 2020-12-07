import React, {useContext} from "react";
import { productContext } from "./context";

export default function Hours (){
    const {regHours} = useContext(productContext);
    
    const currentTimezone = new Date().getTimezoneOffset() / 60;

 return (
     <>
     <div className="calendar__container">
         <div className="calendar__header text-gray-700 p-3">
             <h3>
                GMT-{currentTimezone}
             </h3>
         </div>
         {regHours.map(hour => {
            return (
                <div className="calendar__hours text-gray-600" key={hour[0]}>{`${hour[0]}`}</div>
            )
        })}
     </div>
     </>
 )
}