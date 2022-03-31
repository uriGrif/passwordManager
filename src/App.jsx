import "./App.css";
import Accounts from "./components/Accounts";
import Login from "./components/Login";
import { useContext } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

function App() {
	const { isLoggedIn } = useContext(GlobalContext);
	return (
		<div className="App">
			{isLoggedIn && <Accounts />}
			{!isLoggedIn && <Login />}
			<div className="bg-shapes">
				<div className="square s1"></div>
				<div className="square s2"></div>
				<div className="circle c1"></div>
				<div className="circle c2"></div>
				<div className="circle c3"></div>
				<div className="square s3"></div>
				<div className="circle c4"></div>
			</div>
		</div>
	);
}

export default App;
