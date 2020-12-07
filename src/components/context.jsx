import React, { useState, createContext, useEffect, useCallback} from "react";

export const productContext = createContext();

export const Dates = (props) => {
    const [week, setWeek] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    let currentMonth = Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate);
    let currentYear = currentDate.getFullYear();

    useEffect(() => {
        let currentWk = [
            {
                name: "sun",
            },
            {
                name: "mon",
            },
            {
                name: "tues",
            },
            {
                name: "wed",
            },
            {
                name: "thurs",
            },
            {
                name: "fri",
            },
            {
                name: "sat",
            },
        ];
        currentWk.forEach((day,idx) => {
            const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
            const dayOfWeek = firstDayOfWeek + idx;
            const nextDay = currentDate.setDate(dayOfWeek);
            let newDay = {
                name: day.name,
                date: new Date(nextDay).getDate()
            };
            currentWk.splice(idx, 1, newDay);
        });
        setWeek(currentWk);
    },[currentDate])

    // GENERATE AND POPULATE HOUR ARRAY
    let hours = [];
    for(let i = 1; i <= 24; i++) {
        hours.push(i);
    }
    // PAIRING MILITARY TIME AS VALUE
    // WITH REGULAR TIME AS LABEL WITH AM/PM
    const am = hours.slice(0,12);
    const pm = hours.slice(12,24);
    let regHours = [];
    am.forEach(hour => {
        if(hour < 12){
            regHours.push([`${hour}am`, hour]);
        } else {
            regHours.push([`${hour}pm`, hour]);
        }
    })
    pm.forEach((hour, idx) => {
        if(hour < 24) {
            regHours.push([`${idx + 1}pm`, hour]);
        } else {
            regHours.push([`${idx + 1}am`, hour]);
        }
    })

    const getFromLocal = useCallback((savedDate) => {
        return JSON.parse(localStorage.getItem(savedDate));
   }, [])
   
   const storeLocal = (date, from, to, event) => {
    let day = [];
    let eventGroup = {
        date: date,
        from: from,
        to: to,
        event: event,
        group: `${from}-${date}`
    }
    if(getFromLocal(date)){
        day.push(getFromLocal(date)[0])
    }
    day.push(eventGroup);
    localStorage.setItem(date, JSON.stringify(day));
}
    // CLICKING EVENTS SELECTS IT AND PASSES DATA TO EDIT MENU
   const selectEvent = useCallback((e) => {
        if(document.querySelector('.select')){
            document.querySelectorAll('.select')
                .forEach(selected => {
                    selected.classList.remove('select');
                })
        }
        const group = e.target.dataset.eventgroup;
        const day = e.target.parentNode.id;
        const optionMenu = document.getElementById('optionMenu');
        optionMenu.setAttribute('data-targetevent', group);
        optionMenu.setAttribute('data-day', day);

        document.querySelectorAll(`[data-eventgroup="${group}"]`)
            .forEach(targetHour => {
                targetHour.classList.add('select');
            })
    }, [])

   const setEvents = useCallback((day, from, to, event) => {
        for(let i = parseInt(from); i <= to; i++){
            const selHour = document.getElementById(`${i}-${day}`);
            selHour.classList.add('highlight');
            selHour.setAttribute('data-eventgroup', `${from}-${day}`);
            selHour.addEventListener('click', selectEvent);
        }
        document.getElementById(`${from}-${day}`).innerHTML = event;
   },[selectEvent])

   const validateOverlap = (day, from, to) => {
        let timeFrame = [];
        for(let i = parseInt(from); i <= to; i++){
            const hours = document.getElementById(`${i}-${day}`);
            timeFrame.push(hours);
        }

        for (const hour of timeFrame) {
            if (hour.className === 'calendar__hours highlight'){
                return true
            } else {
                return false
            }
        }
   }
   const [editInfo, setEditInfo] = useState({
       event: "",
       date: "",
       from: "",
       to: ""
    });

    // TOGGLE MENU VISIBILITY
   const menu = (e) => {
       e.preventDefault();
       const addMenu = document.getElementById('addMenu');
       const editMenu = document.getElementById('editMenu');
       const optionMenu = document.getElementById('optionMenu');
       const transparent = document.querySelector('.closeMenu');

       if(e.target.id === "add"){
            optionMenu.style.display = "none";
            transparent.style.display = "block";
            addMenu.style.display = "block";
       } else if(e.target.id === "edit") {
           if(document.querySelector('.select')){
                optionMenu.style.display = "none";
                transparent.style.display = "block";
                editMenu.style.display = "block";
                const group = e.target.parentNode.dataset.targetevent;
                const day = e.target.parentNode.dataset.day;
                editMenu.children[1].setAttribute('data-targetevent', group);
                editMenu.children[1].setAttribute('data-day', day);
                let selEvent;
                getFromLocal(day).forEach(event =>{
                    if(event.group === editMenu.children[1].dataset.targetevent){
                        selEvent = event;
                    }
                })
                setEditInfo(selEvent);
           } else {
               alert('please select an event');
           }
       }else {
           document.getElementById('optionMenu').style.display = "block";
           document.querySelector('.closeOption').style.display = "block";
       }
    }

    const closeAllMenu = () => {
        document.querySelectorAll('.menu').forEach(menus => {
            menus.removeAttribute('style');
        })
    }
    
    return (
        <productContext.Provider
          value={{
              currentDate,
              setCurrentDate,
              currentMonth,
              currentYear,
              hours,
              regHours,
              week,
              setWeek,
              storeLocal,
              getFromLocal,
              setEvents,
              validateOverlap,
              menu,
              editInfo,
              setEditInfo,
              selectEvent,
              closeAllMenu
          }}
        >
          {props.children}
        </productContext.Provider>
      );
}