import "./scss/style.scss";
import Info from "./pages/Info";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
	return (
		<SkeletonTheme baseColor="#fff" highlightColor="#ddd">
			<Router>
				<NavBar />
				<Routes>
					<Route exact path="/" element={<Homepage />} />
					<Route exact path="/info" element={<Info />} />
					<Route exact path="/login" element={<Login />}/>
					<Route exact path="/register" element={<Registration />}/>
					<Route exact path="/logout" element={<Profile />}/>
				</Routes>
			</Router>
		</SkeletonTheme>
	);
}

export default App;
