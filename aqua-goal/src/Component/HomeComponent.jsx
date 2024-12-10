import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate(); 

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
                        </td>
                        <td className="text-center">
                            Compete with friends to be No. 1
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
