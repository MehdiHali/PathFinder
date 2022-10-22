import { Dispatch, SetStateAction, useState } from 'react';
import Logo from './Components/Logo';
import { action } from './Utils/types';
import Mosque from './assets/Mosque.png'
import Castle from './assets/Castle.png'


function ToolBox<T> ({setAction}:{setAction: Dispatch<SetStateAction<action>>}){

    const [selected,setSelected]: [T, Dispatch<SetStateAction<T>>] = useState("" as T);

    function handleChange(ev: any){
        ev.preventDefault();
        setAction(ev.target.value as action);
    }

    return  <form action="" onChange={handleChange} className={"flex items-center space-x-4 list-none "} >
                <li className="flex space-x-4 h-6"><input name="action" value={"WALL"} type={"radio"} className={""}/><span className='flex'><img className='h-6' src={Castle} /></span> </li>
                <li className=""><input name="action" value={"ROUTE"} type={"radio"} className={"mr-2"}/><label>CLEAR</label> </li>
                <li className="text-green-600 p-1 rounded-sm"><input name="action" value={"START"} type={"radio"} className={"mr-2"}/><label>SET START</label> </li>
                <li className="text-red-600 p-1 rounded-sm"><input name="action" value={"GOAL"} type={"radio"} className={"mr-2"}/><label>SET GOAL</label> </li>
            </form>
}

const Header = ({className, visualize, setAction, onClearGrid}: {className: string, visualize: boolean,setAction: Dispatch<SetStateAction<action>>, onClearGrid:Dispatch<SetStateAction<boolean>>})=>{


    return <div className={'bg-gray-300 p-4 flex justify-between '+className}>
        <Logo className={"w-20 h-20 object-contain"}/>

        <ToolBox<action> setAction={setAction}/> 

        <button className='btn' onClick={()=>onClearGrid(true)} >Clear Grid</button>
        <span>{visualize?"Visualizing...":"stopped."}</span>
    </div>
}

export default Header;