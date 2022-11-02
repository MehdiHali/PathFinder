import React from "react";


let Modal = ({children, className}: {children: any, className: string})=>{

    return (
        <div className={"absolute z-50 top-10 right-0 left-0 m-auto bg-gray-100 w-[500px]  p-8"+" "+className} >
            {children}
        </div>
    )
}

export default Modal;