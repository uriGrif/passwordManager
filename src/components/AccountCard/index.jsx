import React, { useState, useContext } from "react";
import { Accordion } from "@mantine/core";
import { Copy, EyeCheck, EyeOff } from "tabler-icons-react";
import "./AccountCard.css";
import Button from "../Button";
import { GlobalContext } from "../../contexts/GlobalContext";

function AccountCard({ account }) {
	const [showPass, setShowPass] = useState(false);
	const { toggleDrawer } = useContext(GlobalContext);

	const togglePass = () => {
		setShowPass(!showPass);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(account.password);
	};

	return (
		<div>
			<Accordion
				iconPosition="right"
				classNames={{
					content: "accountCardContent",
					contentInner: "accountCardContentInner",
					control: "accountCardControl",
					label: "accountCardLabel",
					item: "accountCardItem"
				}}
				styles={{
					icon: {
						color: "var(--main-black)"
					}
				}}
			>
				<Accordion.Item label={account.name}>
					<h4 className="cardSubTitle">email</h4>
					<p className="cardValue">{account.email}</p>
					{account.username && (
						<>
							<h4 className="cardSubTitle">username</h4>
							<p className="cardValue">{account.username}</p>
						</>
					)}
					{account.hint && (
						<>
							<h4 className="cardSubTitle">hint</h4>
							<p className="cardValue">{account.hint}</p>
						</>
					)}
					<h4 className="cardSubTitle">password</h4>
					<p className="cardValue">
						{showPass && account.password}
						{!showPass && [...account.password].map(l => "*")}
						{showPass && (
							<EyeCheck
								onClick={togglePass}
								className="showIcon"
							/>
						)}
						{!showPass && (
							<EyeOff onClick={togglePass} className="showIcon" />
						)}
						{<Copy onClick={handleCopy} className="copyBtn" />}
					</p>
					<div className="accountCardButtons">
						<Button
							text={"edit"}
							onClick={() =>
								toggleDrawer("Edit Account", account, 2)
							}
						/>
						<Button
							text={"delete"}
							onClick={() =>
								toggleDrawer("Delete Account", account, 3)
							}
						/>
					</div>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}

export default AccountCard;
