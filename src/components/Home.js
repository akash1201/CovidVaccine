import React, { useEffect, useState } from "react"
import '../App.css';

const Home = ({history}) => {

          const [pinCode, setPinCode] = useState(()=>0)
          const [date,setDate] = useState(()=>"")
          const [msg, setMsg] = useState(()=>"")

          const submitHandler = () => {

                    if(pinCode == 0 || date == ""){
                          
                              setMsg("Please Enter Complete Details...");

                    }else{
                              localStorage.setItem("date", date);
                              localStorage.setItem("pinCode", pinCode);        
                              history.push("/CenterList");
                    }

          }


return(
          <div className="App">
                   
          <header className="App-header">
                 <h4 style={{color: "white"}}>Vaccination</h4>
               <div className="main-form">
               <div className="mb-3">
                <label className="form-label">Pin Code</label>
                   <input type="number" placeholder={"Pin Code"} className="form-control" id="exampleFormControlInput1" onChange={(e)=>{setPinCode(e.target.value)}} style={{width: "150%"}}/>
                </div>
              <div className="mb-3">
                       <label  className="form-label">Date</label>
                       <input type="date" className="form-control" id="exampleFormControlInput1" onChange={(e)=>{setDate(e.target.value)}}  style={{width: "150%"}}/>
                </div>
                <div className="mb-3" style={{display: "flex"}}>
                <button onClick={submitHandler} type="submit" className="btn btn-primary mb-3">Find Centers</button>
               </div>
               <span style={{fontSize: "50%"}}>{msg}</span>
                </div>
          </header>
        </div>
);
}

export default Home;