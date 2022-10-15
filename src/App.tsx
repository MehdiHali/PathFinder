// @ts-ignore
import './App.css';
import Header from './Header';
import View from './View';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App h-screen min-h-screen">
     <Header className={"h-[10%] bg-primary"}/>
     <div className='flex h-[90vh] '>
      <Sidebar className={"w-[20%] bg-primary hidden sm:block"} />
      <View className={"w-full bg-gray-800 h-full"}/>
     </div>
    </div>
  );
}

export default App;
