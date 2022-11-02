import { Children, createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import Logo from './Components/Logo';
import { action } from './Utils/types';
import Eraser from './assets/eraser.png'
import Home from './assets/home.png'
import Location from './assets/Location.png'
import MyLocation from './assets/MyLocation.png'
import GitHub from './assets/GitHub.svg'
import ToolBox from './Utils/ToolBox';


const Header = ({className, visualize, setAction, setShowHelp}: {className: string, visualize: boolean,setAction: Dispatch<SetStateAction<action>>, setShowHelp: Dispatch<SetStateAction<boolean>>})=>{


    return <div className={'bg-gray-300 p-4 flex justify-between items-center px-8 '+className}>
        <Logo className={" w-32  object-contain"}/>

        <ToolBox<action> onChange={setAction} defaultValue={"WALL"}>
            <ToolBox.Tool  /*onClick={setAction}*/ selected = {true} value={"WALL"}>
                <img src={Home} />
            </ToolBox.Tool>
            <ToolBox.Tool selected={false} value={"ROUTE"}>
                <img src={Eraser} />
            </ToolBox.Tool>
            <ToolBox.Tool selected={false} value={"START"}>
                <img src={MyLocation} />
            </ToolBox.Tool>
            <ToolBox.Tool selected={false} value={"GOAL"}>
                <img src={Location} />
            </ToolBox.Tool>
        </ToolBox> 

        <span>{visualize?"Visualizing...":"Done!"}</span>
        <button className='btn' onClick={()=>{setShowHelp(true)}}>Help?</button>
        <a target="_blank" href={"https://github.com/MehdiHali/PathFinder"}><img src={GitHub} alt="" /></a>
    </div>
}

export default Header;