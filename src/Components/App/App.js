import Loader from '../Loader/Loader.js';
import InputForm from '../InputForm/InputForm.js';
import Report from '../Report/Report.js';
import './App.css';


const App = () => {
  return (
  <div className='bills-container'>
    <InputForm />    
    <Loader isShow={false}/>    
    <hr></hr>
    <br></br>
    <Report />
  </div>
  );
};

export default App;
