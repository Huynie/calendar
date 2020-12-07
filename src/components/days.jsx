import React, {useContext, useEffect} from "react";
import { productContext } from "./context";

export default function Days () {
    const { 
        week, 
        hours, 
        currentDate, 
        getFromLocal, 
        setEvents, 
        selectEvent 
    } = useContext(productContext);   

    useEffect(()=>{
        // HIGHTLIGHT CURRENT DATE
        const todayDate = `${new Date().getMonth()}/${new Date().getDate()}`;
        const todayElement = document.getElementById(`${todayDate}`);
        if(todayElement){
            todayElement.classList.add('current');
        }else{
            document.querySelectorAll('.calendar__header')
            .forEach(day => {
                day.classList.remove('current');
            });
        }

        // CLEAR SAVED EVENTS FROM PREVIOUS WEEK
        document.querySelectorAll('.highlight')
            .forEach( highlighted => {
                highlighted.removeEventListener('click', selectEvent);
                highlighted.classList.remove('highlight');
                highlighted.classList.remove('select');
                highlighted.innerHTML = "";
                highlighted.removeAttribute('data-eventgroup');
            })

        // LOAD SAVED EVENTS FROM LOCAL STORAGE
        const col = document.querySelectorAll('.calendar__days');
        col.forEach(column => {
            if (getFromLocal(column.id)) {
                let saved = getFromLocal(column.id);
                saved.forEach(events => {
                setEvents(events.date, events.from, events.to, events.event);
                })
            }
        })
    }, [week, selectEvent, getFromLocal, setEvents])

    return(
        <>
            {week.map((day,idx) => {
                    return(
                        <div className="calendar__days calendar__container" 
                            key={idx} 
                            id={`${day.name}-${day.date}`}
                            >
                            <div className="calendar__header p-3 text-gray-700" 
                                key={idx} 
                                id={`${currentDate.getMonth()}/${day.date}`}>
                                <h5 >{day.name}</h5>
                                <h4 className="font-bold">
                                    {day.date}
                                </h4>
                            </div>

                            {hours.map(hour => {
                                return (
                                    <div
                                        className="calendar__hours"
                                        key={hour}
                                        id={`${hour}-${day.name}-${day.date}`}>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
        </>
    )
}