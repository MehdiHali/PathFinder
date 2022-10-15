import React from 'react';
import Logo from './Components/Logo';


const Header = ({className}: {className: string})=>{

    return <div className={'bg-gray-300 p-4 '+className}>
        <Logo className={"w-20 h-20 object-contain"}/>
    </div>
}

export default Header;