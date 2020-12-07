import React, {useContext} from "react";
import { productContext } from "./context";

export default function Menu (){
    const {
        regHours,
        week,
        storeLocal, 
        setEvents, 
        menu, 
        editInfo, 
        setEditInfo,
        validateOverlap,
        getFromLocal,
        closeAllMenu,
        selectEvent
    } = useContext(productContext);

    const save = (e) => {
        e.preventDefault();
        const event = document.getElementById('event').value;
        const day = document.getElementById('day').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        
        if (validateOverlap(day, from, to) === true){
            return alert('events will overlap. Try editing or deleting events to free up slot.');
        } else {
            setEvents(day, from, to, event);
            storeLocal(day, from, to, event);
        }
        closeAllMenu();
    }

    const deleteEvent = () => {
        if (!document.querySelector('.select')){
            alert('please select an event');
        } else {
            const target = document.querySelector('.select');
            document.querySelectorAll('.select')
                .forEach(targetHour => {
                    targetHour.removeEventListener('click', selectEvent);
                    targetHour.classList.remove('highlight');
                    targetHour.classList.remove('select');
                    targetHour.innerHTML = "";
                    targetHour.removeAttribute('data-eventgroup');
                })
            let selEvent;
            if (getFromLocal(target.parentNode.id).length === 1) {
                localStorage.removeItem(target.parentNode.id);
            } else {
                getFromLocal(target.parentNode.id).forEach(event =>{
                    if(event.group !== target.dataset.groupevent){
                        selEvent = [event];
                        localStorage.setItem(target.parentNode.id, JSON.stringify(selEvent));
                    } 
                })
            }
            document.querySelectorAll('[data-targetevent]')
                .forEach(targetevent => {
                    targetevent.removeAttribute('targetevent', 'day')
                })

            closeAllMenu();
        }
    }

    const editEvent = (e) => {
        e.preventDefault();
        if (!document.querySelector('.select')){
            return alert('please select an event');
        }
        deleteEvent();
        let editEvent;
        if(document.getElementById('editEvent').value === ""){
            editEvent = document.getElementById('editEvent').placeholder;
        } else {
            editEvent = document.getElementById('editEvent').value;
        }
        const editDay = document.getElementById('editDay').value;
        const editFrom = document.getElementById('editFrom').value;
        const editTo = document.getElementById('editTo').value;

        if(validateOverlap(editDay, editFrom, editTo) === true){
            return alert('events cannot overlap!')
        } else {
            setEvents(editDay, editFrom, editTo, editEvent);
            storeLocal(editDay, editFrom, editTo, editEvent);
        }
        closeAllMenu();
    }

    const change = (e) => {
        console.log(e.target.value)
        let edit = {...editInfo};

        switch (e.target.id) {
            case 'editDay':
                edit.date = e.target.value;
                setEditInfo(edit);
                break;
            case 'editFrom':
                edit.from= e.target.value;
                setEditInfo(edit);
                break;
            case 'editTo':
                edit.to= e.target.value;
                setEditInfo(edit);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="optionMenu menu bg-gray-400" id="optionMenu">
                <button 
                    className="
                    bg-tranparent 
                    p-3
                    w-max 
                    text-white 
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:bg-gray-300" 
                    id="add"
                    onClick={menu}>
                       <svg 
                        className="w-8 h-8 pointer-events-none" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path 
                                className="pointer-events-none"
                                fill-rule="evenodd" 
                                d="M10 5a1 1 0 011 1v3h3a1
                                 1 0 110 2h-3v3a1 1 0 11-2
                                  0v-3H6a1 1 0 110-2h3V6a1
                                   1 0 011-1z" 
                                   clip-rule="evenodd">
                            </path>
                    </svg>
                </button>
                <br/>
                <button 
                    className="
                    bg-tranparent 
                    p-3
                    w-max 
                    text-white 
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:bg-gray-300" 
                    id="edit"
                    onClick={menu}>
                     <svg 
                        className="w-8 h-8 pointer-events-none" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={menu}>
                            <path 
                                className="pointer-events-none"
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5
                                2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                            </path>
                    </svg>
                </button>
                <br/>
                <button 
                    className="
                    bg-tranparent 
                    p-3
                    w-max 
                    text-white 
                    font-black 
                    font-sans 
                    focus:outline-none
                    hover:bg-gray-300"
                    onClick={deleteEvent}>
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
                                    d="M19 7l-.867 12.142A2 2
                                     0 0116.138 21H7.862a2 2 0
                                      01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1
                                       1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                        </svg>
                </button>
            </div>
            <div className="modal menu" id="addMenu">
                <h2>add events</h2>
                <form onSubmit={save}>
                    <label htmlFor="event">event</label>
                    <input 
                        type="text" 
                        id="event" 
                        name="event" 
                        placeholder="what do you need to do?" 
                        required/>
                <br/>
                <label htmlFor="day">Day</label>
                <select name="day" id="day">
                    {week.map((day,idx) => {
                        return(
                            <option 
                                key={idx} 
                                id={day.date}
                                >
                                    {`${day.name}-${day.date}`}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="from">From:</label>
                <select id="from" >
                    {regHours.map((hour,idx) => {
                        return (
                            <option 
                                value={hour[1]}
                                key={idx}
                                >
                                    {hour[0]}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="to">To:</label>
                <select id="to">
                    {regHours.map((hour,idx) => {
                        return (
                            <option 
                                value={hour[1]}
                                key={idx}
                                    >
                                    {hour[0]}
                            </option>
                        )
                    })}
                </select>
                <br/>
                <button>save</button>
                </form>
            </div>
            <div className="modal menu" id="editMenu">
                <h2>edit events</h2>
                <form onSubmit={editEvent}>
                    <label htmlFor="editEvent">event</label>
                    <input 
                        type="text" 
                        id="editEvent" 
                        name="editEvent" 
                        placeholder={editInfo.event}/>
                <br/>
                <label htmlFor="editDay">Day</label>
                <select 
                    name="editDay" 
                    id="editDay" 
                    value={editInfo.date} 
                    onChange={change}>
                    {week.map((day,idx) => {
                        return(
                            <option 
                                key={idx} 
                                id={day.date} >
                                    {`${day.name}-${day.date}`}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="editFrom">From:</label>
                <select 
                    id="editFrom" 
                    value={editInfo.from} 
                    onChange={change}>
                    {regHours.map((hour,idx) => {
                        return (
                            <option 
                                value={hour[1]}
                                key={idx}>
                                    {hour[0]}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="editTo">To:</label>
                <select id="editTo" value={`${editInfo.to}`} onChange={change}>
                    {regHours.map((hour,idx) => {
                        return (
                            <option 
                                value={hour[1]}
                                key={idx}>
                                    {hour[0]}
                            </option>
                        )
                    })}
                </select>
                <button>save changes</button>
                </form>
            </div>
            <div className="closeMenu menu" onClick={closeAllMenu}></div>
            <div className="closeOption menu" onClick={closeAllMenu}></div>
        </>
    )
}