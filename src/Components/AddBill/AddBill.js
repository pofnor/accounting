import { useState } from 'react';
import './AddBill.js';

const AddBill = () => {

  const [newBillTitle, setNewBillTitle] = useState('');
  const [newBillCost, setNewBillCost] = useState('');

  const updateBills = () => {
    console.log(newBillTitle,newBillCost);
  };

  const billObjectValid = () => {
    // newBillCost is truthy and is a number
    const costValid = newBillCost && Number.parseFloat(newBillCost);

    // newBilTitle is truthy and not only whitespace characters
    const titleValid = newBillTitle &&
      newBillTitle.split('').find(char => char !== ' ');
    return titleValid && costValid;
  };

  const clearForm = () => {
    setNewBillCost('');
    setNewBillTitle('');

  };

  return (
    <div className='add-bill-container'>
      <input className='add-bill-from-control'
      placeholder='Enter bill title'
        type='text'
        value={newBillTitle}
        onChange={(e)=>setNewBillTitle(e.target.value)}></input>
      <input className='add-bill-from-control'
      placeholder='Enter cost title'
        type='number'
        value={newBillCost}
        onChange={(e)=>setNewBillCost(e.target.value)}></input>
        <button className='add-bill-form-control'
        onClick={() => {
          if(billObjectValid()){
            updateBills();
            clearForm();
          }          
        }}>Add Bill</button>
    </div>
    
  );
}

export default AddBill;