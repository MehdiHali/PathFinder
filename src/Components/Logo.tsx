import logo from '../assets/PathFinderLogo.svg'


function Logo({className}: {className: string}) {
  return (
  <div className={" "+className}>
    <img src={logo} alt="" />
    {/* Grapher */}
    </div>
  );
}

export default Logo;