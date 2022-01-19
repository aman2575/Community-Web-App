import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import '../configureAmplify'


function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      checkUser()
 }, []);

  async function checkUser() {
      try{const userData = await Auth.currentAuthenticatedUser()
      console.log(userData)
      setUser(userData)}
      catch(err){
          console.log("Error in Fetching User")
      }
      
  }

  return (
    <div>
      

      {user ? (
        <>
        <h3>Email: {user.attributes.email}</h3>
      <h3>Name: {user.attributes.name}</h3>
      <h3>UserName: {user.username}</h3>

      <h3>PicTure<img src={user.attributes.picture} /></h3>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Google Sign In</button>
        
      )}
    </div>
  );
}

export default Login;

