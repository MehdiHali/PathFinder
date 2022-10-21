import { Dispatch, SetStateAction } from 'react';
import Logo from './Components/Logo';
import { action } from './Utils/types';


const Header = ({className, visualize, setAction, onClearGrid}: {className: string, visualize: boolean,setAction: Dispatch<SetStateAction<action>>, onClearGrid:Dispatch<SetStateAction<boolean>>})=>{

    function handleChange(ev: any){
        ev.preventDefault();
        setAction(ev.target.value as action);
    }

    return <div className={'bg-gray-300 p-4 flex justify-between '+className}>
        <Logo className={"w-20 h-20 object-contain"}/>
        <form action="" onChange={handleChange} className={"flex items-center space-x-4 list-none "} >
            <li className=""><input name="action" value={"WALL"} type={"radio"} className={"mr-2"}/><label>MAKE WALL</label> </li>
            <li className=""><input name="action" value={"ROUTE"} type={"radio"} className={"mr-2"}/><label>CLEAR</label> </li>
            <li className="text-green-600 p-1 rounded-sm"><input name="action" value={"START"} type={"radio"} className={"mr-2"}/><label>SET START</label> </li>
            <li className="text-red-600 p-1 rounded-sm"><input name="action" value={"GOAL"} type={"radio"} className={"mr-2"}/><label>SET GOAL</label> </li>
        </form>
        <button className='btn' onClick={()=>onClearGrid(true)} >Clear Grid</button>
        <span>{visualize?"Visualizing...":"stopped."}</span>
    </div>
}

export default Header;