import React from "react";
import './App.css';
import {Dates} from './components/context';
import Hours from './components/hours';
import Days from './components/days';
import Nav from './components/nav';
import Menu from './components/menu';

export default function App() {
  return (
    <>
      <Dates>
        <Nav/>
        <div className="calendar">
          <Hours/>
          <Days/>
          <Menu/>
        </div>
      </Dates>
    </>
  );
}


