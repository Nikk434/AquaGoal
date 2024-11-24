import { useNavigate } from 'react-router-dom';
// import TrackDaily from './TrackDaily'
export default function HomePage() {
    const navigate = useNavigate(); 
    return(
        <div>
            <h1>hello</h1>
            <table>
                <td>
                    <button onClick={()=> navigate('/TrackDaily') }>track daily</button>
                    
                </td>
                <td><button onClick={()=> navigate('/CreateChallenge')}>create challenge</button></td>
                
            </table>
        </div>
    )
}