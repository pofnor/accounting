import axios from 'axios';
async function Post(balance,bill,isIncome,y,m,d){
  // Loader(true);  
  try{
    // check the username is unique  
    const datas = await axios.get("http://localhost:3001/accounting");
    // showLoader(false);    
    // get last ID from database
    const lastId = datas.data[datas.data.length-1].id;      
    // Add new user
    const newId = +lastId + 1;
    // showLoader(true);

    // Calculate
    let balanceFinal = +balance;
    if(isIncome){
      balanceFinal += +bill; 
    } else {
      balanceFinal -= +bill;
    }
    const post = await axios.post("http://localhost:3001/accounting",{
      "id": String(newId),
      "balance": String(balanceFinal),
      "bill": String(bill),
      "isIncome": String(isIncome),
      "y": String(y),
      "m": String(m),
      "d": String(d)
    });
    // showLoader(false);
    if(post.status === 201){
      // toast("Your Account has successfully created");
      console.log("ok");
    } else {
      console.log("error");
      // result.innerHTML = "<span>" + "Error :" + "</span><br>" + response.message + "<br>" + response.config.url;
    }      
                      
  }
  catch(error){
    // showLoader(false);
    console.log("errorError");
    // result.innerHTML = "<span>" + "Error :" + "</span><br>" + error.message + "<br>";
  }
}  

export default Post;