import { useNavigate } from 'react-router-dom';
import { callApi } from './API/HelloApi';
import { useState } from 'react';
import DailyTracker from './DailyTracker';

export default function HomePage() {
    const navigate = useNavigate(); 

    const [msg, setMsg] = useState(null)

    function callApiHello() {
        callApi()
            .then((response) => success(response))
            .catch((error) => errorMsg(error))
            .finally(console.log('ishgfsgh'))
    }

    function success(response) {
        console.log(response)
        setMsg(response.data)
    }
    function errorMsg(error) {
        console.log(error)
    }

    const [currentCount, setCurrentCount] = useState(0);
    const handleDailyTrackCount = (count) =>
    {
        setCurrentCount(count);
    };
    
    return(
        <div className="container text-center">
            <h1 className="my-4">Hello</h1>
            <table className="table">
                <tbody>
                    <tr>
                        <td className="text-center">
                            <button 
                                className="btn btn-primary" 
                                onClick={() => navigate('/TrackDaily')}
                            >
                                Track Daily

                            </button>
                        </td>
                        <td className="text-center">
                            <button 
                                className="btn btn-success" 
                                onClick={() => navigate('/CreateChallenge')}
                            >
                                Create Challenge
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center">
                            Set a daily goal to achieve
                            <DailyTracker onDailyTrack={handleDailyTrackCount} />
                        </td>
                        <td className="text-center">
                            Compete with friends to be No. 1
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={callApiHello}>Hello</button>
            </div>
            <div className='text-info'>
                {msg}
            </div>
        </div>
    );
}
