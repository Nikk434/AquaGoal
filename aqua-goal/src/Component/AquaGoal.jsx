import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './HomePage';
import HomePage from './HomeComponent';
import TrackDaily from './TrackDaily';
import CreateChallenge from './CreateChallenge';
import Login from './Auth/LogInComponent';
import Register from './Auth/RegisterComponent';

export default function AquaGoal() {
    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path='/register' element={<Register/>}/>
                <Route path="/authenticate" element={<Login/>}/>
                <Route path="/TrackDaily" element={<TrackDaily />} />
                <Route path="/CreateChallenge" element={<CreateChallenge />} />
            </Routes>
        </Router>
    );
}