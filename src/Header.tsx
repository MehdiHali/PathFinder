import { Children, createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import Logo from './Components/Logo';
import { action } from './Utils/types';
import Mosque from './assets/Mosque.png'
import Castle from './assets/Castle.png'
import Home from './assets/Home.svg'
import Location from './assets/Location.png'
import MyLocation from './assets/MyLocation.png'

let ToolBoxContext = createContext({} as any);

ToolBox.Tool = function Tool<T>({value, onClick, children}:{value: T, selected: boolean, onClick?: (value: T,...params: any[])=>void, children: ReactNode}){
    // const [value,setValue] : [T, Dispatch<SetStateAction<T>>] = useState("" as T);

    let {selected, setSelected} = useContext(ToolBoxContext);

    return <li onClick={()=>{setSelected(value);onClick && onClick(value)}} className={"flex space-x-4 h-8 p-1 rounded-md cursor-pointer hover:border-2 border-yellow-400 hover:bg-orange-400 hover:border-dashed "+((selected === value)&&" bg-orange-400")}>
            {children}
        </li>

}



function ToolBox<T> ({onChange, defaultValue, children}:{onChange: Dispatch<SetStateAction<T>>, defaultValue: T, children: ReactNode}){

    const [selected,setSelected]: [T, Dispatch<SetStateAction<T>>] = useState(defaultValue);

    function handleChange(ev: any){
        ev.preventDefault();
        setSelected(ev.target.value);
    }

    useEffect(()=>{
        onChange(selected);
    }, [selected]);

    return <ToolBoxContext.Provider value={{selected,setSelected}}>
    
            <div  onChange={handleChange} className={"flex items-center space-x-4 list-none "} >
                {children}
            </div>
            </ToolBoxContext.Provider>
}

const Header = ({className, visualize, setAction, onClearGrid}: {className: string, visualize: boolean,setAction: Dispatch<SetStateAction<action>>, onClearGrid:Dispatch<SetStateAction<boolean>>})=>{


    return <div className={'bg-gray-300 p-4 flex justify-between items-center '+className}>
        <Logo className={" w-28  object-contain"}/>

        <ToolBox<action> onChange={setAction} defaultValue={"WALL"}>
            <ToolBox.Tool  /*onClick={setAction}*/ selected = {true} value={"WALL"}>
                <img src={Home} />
            </ToolBox.Tool>
            <ToolBox.Tool selected={false} value={"START"}>
                <img src={MyLocation} />
            </ToolBox.Tool>
            <ToolBox.Tool selected={false} value={"GOAL"}>
                <img src={Location} />
            </ToolBox.Tool>
        </ToolBox> 

        <span>{visualize?"Visualizing...":"Done!"}</span>
        <button className='btn' onClick={()=>onClearGrid(true)} >Clear Grid</button>
    </div>
}

export default Header;