// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpRWsDmSoLL-cRCW9jf0CObBMBj7GdJGE",
  authDomain: "aquagoal-pushnoti.firebaseapp.com",
  projectId: "aquagoal-pushnoti",
  storageBucket: "aquagoal-pushnoti.firebasestorage.app",
  messagingSenderId: "579177342873",
  appId: "1:579177342873:web:6f18ed91703858f4049508",
  measurementId: "G-RLQY3M15Z5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async ()=> {
    const permission = await Notification.requestPermission()
    console.log(permission) 
    if (permission==="granted") {
        const token = await getToken(messaging,{
            vapidkey:"BJPxQUOOdrcuACa2DJ1KLOID01PJPrXL-iuwRNdINUqTpVklsbyZ2swDI5qn61H_6xGZDSCu7NtWdLEjVv-TlfI"
        });
        console.log(token)
    }
    
}