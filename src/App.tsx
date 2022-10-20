import './App.css';
import Header from './Header';
import View from './View';
import Sidebar from './Sidebar';
import Stack from './Utils/Stack';
import { ReactNode, useEffect, useState } from 'react';
import { setConstantValue } from 'typescript';
// import {useStack} from './Utils/useStack'
// import {useGraph} from './Utils/useGraph'

function App() {

    let [count, setCount] = useState(0);

    useEffect(()=>{

    },[])
 
    useEffect(()=>{
      // push(stack,count);
    },[count])

    // function push(n: number){
    //   setStack((stack): Stack=>{
    //     console.log("pushing");
    //     stack.push(n);
    //     let newStack = new Stack();
    //     return stack;
    //   });
    // }

    // function pop(){
    //   setStack((stack): Stack=>{
    //     console.log(stack.pop()??"empty"); 
    //     setCount(count=>count-1);
    //     return stack;
    //   });
    // }

  return (
    <div className="App h-screen min-h-screen">
     <Header className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar className={"w-[20%] bg-primary hidden sm:block"} />
      <View  className={"w-full bg-gray-100 h-full"}/>
     </div>
    </div>
  );
}

export default App;
