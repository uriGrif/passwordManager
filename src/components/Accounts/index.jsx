import { useState, useContext } from "react";
import React from "react";
import Button from "../Button";
import "./Accounts.css";
import { Search } from "tabler-icons-react";
import { Input, Drawer } from "@mantine/core";
import AccountCard from "../AccountCard";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CreateAccount, EditAccount, DeleteAccount } from "../Forms";

function Accounts() {
	const [search, setSearch] = useState("");
	const {
		toggleDrawer,
		isDrawerOpen,
		accounts,
		decryptAccount,
		exit,
		drawerTitle,
		drawerAcc,
		drawerAction
	} = useContext(GlobalContext);

	return (
		<div className="accounts">
			<h1>my accounts</h1>
			<div className="accountsButtons">
				<Button
					text="add"
					onClick={() => toggleDrawer("Create Account", {}, 1)}
				/>
				<Button text="exit" onClick={exit} />
			</div>
			<Drawer
				opened={isDrawerOpen}
				onClose={toggleDrawer}
				title={drawerTitle}
				padding="xl"
				size="xl"
				styles={{
					drawer: {
						background: "var(--main-black)"
					},
					title: {
						color: "var(--main-white)",
						fontFamily: "'Outfit', sans-serif"
					}
				}}
			>
				{drawerAction === 1 && <CreateAccount />}
				{drawerAction === 2 && (
					<EditAccount initialValues={drawerAcc} />
				)}
				{drawerAction === 3 && (
					<DeleteAccount id={drawerAcc._id} name={drawerAcc.name} />
				)}
			</Drawer>
			<Input
				className="accountsSearch"
				radius="md"
				value={search}
				placeholder="search"
				styles={{
					input: {
						background: "#EEE",
						fontFamily: "'Outfit', sans-serif"
					}
				}}
				onChange={e => setSearch(e.currentTarget.value)}
				rightSection={<Search color="var(--main-black)" />}
			/>
			<div className="accountsList">
				{accounts &&
					accounts.map(account => {
						if (
							account.name
								.toLowerCase()
								.includes(search.toLowerCase())
						) {
							return (
								<AccountCard
									key={account._id}
									account={decryptAccount(account)}
								/>
							);
						}
					})}
			</div>
		</div>
	);
}

export default Accounts;
