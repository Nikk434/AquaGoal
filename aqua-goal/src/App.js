// import logo from './logo.svg';
import './App.css';
// import HomePage from './Component/HomeComponent';
import AquaGoal from './Component/AquaGoal';
import { generateToken, messaging } from './Component/firebase/firebase';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
function App() {
  useEffect(()=>{
    generateToken();
    onMessage(messaging, (payload)=>{
      console.log(payload);
    })
  },[])

  return (
    <div className='App'>
      {/* <HomePage></HomePage> */}
      <AquaGoal></AquaGoal>
    </div> 
  )
}

export default App;
