import './Loader.css'

function Loader(props){
  if(props.isShow) {      
    return (
      <div id='loader' className='loader show'>
        <div id='loaderIcon' className='loaderIcon'><div></div><div></div><div></div><div></div></div>
        <p id='loaderText' className='loaderText'>Loading...</p>
      </div>
    );
  } else {    
    return (
      <div id='loader' className='loader hide'>
        <div id='loaderIcon' className='loaderIcon'><div></div><div></div><div></div><div></div></div>
        <p id='loaderText' className='loaderText'>Loading...</p>
      </div>
    );
  }
}
export default Loader;