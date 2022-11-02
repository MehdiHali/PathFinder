import logo from '../assets/PathFinderLogo.svg'


function Logo({className}: {className: string}) {
  return (
  <div className={" w-fit font-bold text-xl "+className}>
    {/* <img src={logo} alt="" /> */}
    Path Finding Visualizer
    </div>
  );
}

export default Logo;