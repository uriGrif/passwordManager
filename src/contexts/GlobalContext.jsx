import { useState, createContext } from "react";
import cryptoJs from "crypto-js";

const GlobalContext = createContext();

const getAuthKey = pass => {
	return cryptoJs.SHA256(pass.toString("utf8")).toString(cryptoJs.enc.Hex);
};

const getVaultKey = (pswd, key) => {
	return cryptoJs.SHA256(pswd + key).toString();
};

const encryptAccount = (acc, key) => {
	return {
		...acc,
		password: cryptoJs.AES.encrypt(acc.password, key).toString()
	};
};

const GlobalProvider = ({ children }) => {
	const [accounts, setAccounts] = useState([]);
	const [vaultKey, setVaultKey] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [token, setToken] = useState("");
	const [drawerTitle, setDrawerTitle] = useState("");
	const [drawerAcc, setDrawerAcc] = useState({});
	const [drawerAction, setDrawerAction] = useState(0);

	const login = async pswd => {
		try {
			const res = await fetch("/.netlify/functions/login", {
				method: "POST",
				body: JSON.stringify({ password: getAuthKey(pswd) })
			});
			const data = await res.json();
			if (res.ok) {
				setIsLoggedIn(true);
				setAccounts(data.accounts);
				setToken(data.token);
				setVaultKey(getVaultKey(pswd, data.key));
			}
			return res;
		} catch (error) {
			if (error.status === 401) {
				return { error: true, message: error };
			}
		}
	};

	const toggleDrawer = (title, acc, action) => {
		if (!isDrawerOpen) {
			setDrawerTitle(title);
			setDrawerAcc(acc);
			setDrawerAction(action);
		}
		setIsDrawerOpen(!isDrawerOpen);
	};

	const exit = () => {
		setIsLoggedIn(false);
		setVaultKey("");
		setToken("");
		setAccounts([]);
	};

	const loadAccounts = async () => {
		try {
			const res = await fetch(
				`/.netlify/functions/accounts?token=${token}`,
				{
					method: "GET"
				}
			);
			const accounts = await res.json();
			setAccounts(accounts);
		} catch (error) {
			return error;
		}
	};

	const addAccount = async account => {
		try {
			const res = await fetch("/.netlify/functions/accounts", {
				method: "POST",
				body: JSON.stringify({
					account: encryptAccount(account, vaultKey),
					token
				})
			});
			await loadAccounts();
			return res;
		} catch (error) {
			return { error: true, message: error };
		}
	};

	const editAccount = async account => {
		try {
			const res = await fetch("/.netlify/functions/accounts", {
				method: "PATCH",
				body: JSON.stringify({
					account: encryptAccount(account, vaultKey),
					token
				})
			});
			await loadAccounts();
			return res;
		} catch (error) {
			return { error: true, message: error };
		}
	};

	const deleteAccount = async accountId => {
		try {
			const res = await fetch("/.netlify/functions/accounts", {
				method: "DELETE",
				body: JSON.stringify({ _id: accountId, token })
			});
			await loadAccounts();
			return res;
		} catch (error) {
			return { error: true, message: error };
		}
	};

	const decryptAccount = account => {
		return {
			...account,
			password: cryptoJs.AES.decrypt(account.password, vaultKey).toString(
				cryptoJs.enc.Utf8
			)
		};
	};

	const values = {
		accounts,
		vaultKey,
		isLoggedIn,
		login,
		isDrawerOpen,
		drawerAcc,
		drawerTitle,
		drawerAction,
		toggleDrawer,
		addAccount,
		editAccount,
		deleteAccount,
		exit,
		decryptAccount
	};

	return (
		<GlobalContext.Provider value={values}>
			{children}
		</GlobalContext.Provider>
	);
};

export { GlobalContext, GlobalProvider };
