import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './HomePage';
import HomePage from './HomeComponent';
import TrackDaily from './TrackDaily';
import CreateChallenge from './CreateChallenge';

export default function AquaGoal() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/TrackDaily" element={<TrackDaily />} />
                <Route path="/CreateChallenge" element={<CreateChallenge />} />
            </Routes>
        </Router>
    );
}