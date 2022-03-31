import { useState, useContext } from "react";
import { PasswordInput } from "@mantine/core";
import Button from "../Button";
import "./Login.css";
import { GlobalContext } from "../../contexts/GlobalContext";

function Login() {
	const [value, setValue] = useState("");
	const { login } = useContext(GlobalContext);
	const [error, setError] = useState(false);

	const handleLogin = async e => {
		e.preventDefault();
		const res = await login(value);
		if (!res.ok) {
			setError("Invalid password");
		}
	};

	return (
		<div className="login">
			<h1>
				p@ssw0rd <br />
				manag3r
			</h1>
			<form onSubmit={handleLogin}>
				<PasswordInput
					value={value}
					onChange={event => setValue(event.currentTarget.value)}
					className="myInput"
					radius="md"
					styles={{
						input: { background: "#eee" },
						label: {
							color: "inherit",
							fontFamily: "'Outfit', sans-serif",
							fontSize: "1rem"
						},
						wrapper: {
							marginBottom: "20px"
						}
					}}
					error={error}
					placeholder="Enter your password"
					label="password"
				/>
				<Button text="login" type="submit" />
			</form>
		</div>
	);
}

export default Login;
