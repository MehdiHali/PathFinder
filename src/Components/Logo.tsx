import logo from '../assets/Logo.svg'


function Logo({className}: {className: string}) {
  return (
  <div className={"text-2xl font-bold "+className}>
    <img src={logo} alt="" />
    {/* Grapher */}
    </div>
  );
}

export default Logo;