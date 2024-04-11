import {React,useState,useRef} from 'react'
import "./LoginDetailsCard.scss"
const LoginDetailsCard = ({userRole,userName,password}) => {
  const userRef = useRef("");
  const passwordRef = useRef("");
  

  const copy = async (ref) => {
    const text=ref.current.value;
    console.log(ref.current.value);
    await navigator.clipboard.writeText(text);
    alert(`${text}`);
  };

  return (
  <>        
        <div className="card-container">
          <div className="card-wrapper">
          
            <h1> {userRole} Sign In Details</h1>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="user">Username:</label></td>
                  <td><input ref={userRef} type="text" value={userName} readOnly /></td>
                  <td><button onClick={()=>copy(userRef)}>Copy</button></td>
                </tr>
                <tr>
                  <td><label htmlFor="password">Password:</label></td>
                  <td><input ref={passwordRef}  type="password" value={password} readOnly/></td>
                  <td><button onClick={()=>copy(passwordRef)}>Copy</button></td>
                </tr>  
              </tbody>             
            </table>




            {/* <div class="button-wrapper"> 
              <button class="btn outline">DETAILS</button>
              <button class="btn fill">BUY NOW</button>
            </div> */}

          </div>
          
        </div>       
  </>
    
  )
}

export default LoginDetailsCard;