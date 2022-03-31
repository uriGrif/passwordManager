import React, { useContext, useState } from "react";
import {
	TextInput,
	Textarea,
	PasswordInput,
	Alert,
	Notification
} from "@mantine/core";
import { AlertCircle, Check } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import "./Forms.css";
import Button from "../Button";
import { GlobalContext } from "../../contexts/GlobalContext";

function CreateAccount() {
	const { toggleDrawer, addAccount } = useContext(GlobalContext);
	const [showAlert, setShowAlert] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			username: "",
			hint: "",
			password: ""
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
		}
	});

	const handleSubmit = async values => {
		setShowLoading(true);
		const res = await addAccount(values);
		const data = await res.json();
		if (data) setShowLoading(false);
		if (data.error) {
			setShowAlert(true);
		} else {
			setShowNotification(true);
			setTimeout(() => {
				toggleDrawer();
			}, 1200);
		}
	};

	return (
		<form
			onSubmit={form.onSubmit(values => {
				handleSubmit(values);
			})}
		>
			<TextInput
				type="text"
				placeholder="account name"
				label="name"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("name")}
				required
			/>
			<TextInput
				type="text"
				placeholder="email"
				label="email"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("email")}
				required
			/>
			<TextInput
				type="text"
				placeholder="username"
				label="username (optional)"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("username")}
			/>
			<Textarea
				label="hint (optional)"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				placeholder="hint"
				{...form.getInputProps("hint")}
			/>
			<PasswordInput
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				placeholder="Enter your password"
				label="password"
				{...form.getInputProps("password")}
				required
			/>
			<Button text={"add"} type="submit" />
			{showAlert && (
				<Alert
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
					withCloseButton
					styles={{
						root: {
							backgroundColor: "var(--main-white) !important"
						}
					}}
				>
					There has been an error when creating the account. Please
					try again
				</Alert>
			)}
			{showNotification && (
				<Notification
					icon={<Check size={18} />}
					color="teal"
					title="Success!"
				>
					Account has been created succesfully
				</Notification>
			)}
			{showLoading && <Notification loading>Uploading</Notification>}
		</form>
	);
}

function EditAccount({ initialValues }) {
	const { toggleDrawer, editAccount } = useContext(GlobalContext);
	const [showAlert, setShowAlert] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const form = useForm({
		initialValues: {
			_id: initialValues._id,
			name: initialValues.name,
			email: initialValues.email,
			username: initialValues.username,
			hint: initialValues.hint,
			password: initialValues.password
		},
		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
		}
	});

	const handleSubmit = async values => {
		setShowLoading(true);
		const res = await editAccount(values);
		const data = await res.json();
		if (data) setShowLoading(false);
		if (data.error) {
			setShowAlert(true);
		} else {
			setShowNotification(true);
			setTimeout(() => {
				toggleDrawer();
			}, 1200);
		}
	};

	return (
		<form
			onSubmit={form.onSubmit(values => {
				handleSubmit(values);
			})}
		>
			<input type="hidden" {...form.getInputProps("_id")} />
			<TextInput
				type="text"
				placeholder="account name"
				label="name"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("name")}
				required
			/>
			<TextInput
				type="text"
				placeholder="email"
				label="email"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("email")}
				required
			/>
			<TextInput
				type="text"
				placeholder="username"
				label="username (optional)"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				{...form.getInputProps("username")}
			/>
			<Textarea
				label="hint (optional)"
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				placeholder="hint"
				{...form.getInputProps("hint")}
			/>
			<PasswordInput
				radius="md"
				classNames={{
					input: "inputInput",
					label: "inputLabel",
					wrapper: "inputWrapper"
				}}
				placeholder="Enter your password"
				label="password"
				{...form.getInputProps("password")}
				required
			/>
			<Button text={"update"} type="submit" />
			{showAlert && (
				<Alert
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
					withCloseButton
					styles={{
						root: {
							backgroundColor: "var(--main-white) !important"
						}
					}}
				>
					There has been an error when updating the account. Please
					try again
				</Alert>
			)}
			{showNotification && (
				<Notification
					icon={<Check size={18} />}
					color="teal"
					title="Success!"
				>
					Account has been upadted succesfully
				</Notification>
			)}
			{showLoading && <Notification loading>Updating</Notification>}
		</form>
	);
}

function DeleteAccount({ id, name }) {
	const { toggleDrawer, deleteAccount } = useContext(GlobalContext);
	const [showAlert, setShowAlert] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const handleSubmit = async () => {
		setShowLoading(true);
		const res = await deleteAccount(id);
		if (res) setShowLoading(false);
		if (res.error) {
			setShowAlert(true);
		} else {
			setShowNotification(true);
			setTimeout(() => {
				toggleDrawer();
			}, 1200);
		}
	};

	return (
		<>
			<h2 className="deleteTitle">
				Do you want to delete "{name}" account?
			</h2>
			<Button text={"delete"} onClick={handleSubmit} />
			{showAlert && (
				<Alert
					icon={<AlertCircle size={16} />}
					title="Error!"
					color="red"
					withCloseButton
					styles={{
						root: {
							backgroundColor: "var(--main-white) !important"
						}
					}}
				>
					There has been an error when deleting the account. Please
					try again
				</Alert>
			)}
			{showNotification && (
				<Notification
					icon={<Check size={18} />}
					color="teal"
					title="Success!"
				>
					Account has been deleted succesfully
				</Notification>
			)}
			{showLoading && <Notification loading>Deleting</Notification>}
		</>
	);
}

export { CreateAccount, EditAccount, DeleteAccount };
