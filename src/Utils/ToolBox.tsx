
import { useEffect } from "react";
import { useContext } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import { SetStateAction } from "react";
import { ReactNode } from "react";
import ToolBoxContext from "../ToolBoxContext";


ToolBox.Tool = function Tool<T>({value, onClick, children}:{value: T, selected: boolean, onClick?: (value: T,...params: any[])=>void, children: ReactNode}){
    // const [value,setValue] : [T, Dispatch<SetStateAction<T>>] = useState("" as T);

    let {selected, setSelected} = useContext(ToolBoxContext);

    return <li onClick={()=>{setSelected(value);onClick && onClick(value)}} className={"flex space-x-4 h-8 w-8 p-1 rounded-md cursor-pointer hover:border-2 border-yellow-400 hover:bg-slate-400 hover:border-dashed "+((selected === value)&&" bg-slate-400")}>
            {children}
        </li>
}



function ToolBox<T> ({onChange, defaultValue, children, className}:{onChange: Dispatch<SetStateAction<T>>, defaultValue: T, children: ReactNode, className?: string}){

    const [selected,setSelected]: [T, Dispatch<SetStateAction<T>>] = useState(defaultValue);

    function handleChange(ev: any){
        ev.preventDefault();
        setSelected(ev.target.value);
    }

    useEffect(()=>{
        onChange(selected);
    }, [selected]);

    return <ToolBoxContext.Provider value={{selected,setSelected}}>
    
            <div  onChange={handleChange} className={"flex items-center space-x-4 list-none "+" "+className} >
                {children}
            </div>
            </ToolBoxContext.Provider>
}

export default ToolBox;