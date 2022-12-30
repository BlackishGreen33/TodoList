import { nanoid } from "nanoid";

const Input = (props) => {
	const { todos } = props;
	const handleAdd = (e) => {
		const { keyCode, target } = e;
		if (keyCode !== 13) return;
		const value = target.value.trim();
		if (!value) return;
		const todoObj = {
			id: nanoid(),
			content: value,
			completed: false,
			editing: false,
		};
		props.addTodo(todoObj);
		target.value = "";
	};
	const handleCompleteAll = (e) => {
		props.completeAllTodos(e.target.checked);
	};

	return (
		<div className="header">
			<h1>todos</h1>
			<input
				onKeyUp={handleAdd}
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
			></input>
			<section
				style={{ display: todos.length ? "block" : "none" }}
				className="main"
			>
				<input
					onClick={handleCompleteAll}
					id="toggle-all"
					className="toggle-all"
					type="checkbox"
				/>
				<label htmlFor="toggle-all"></label>
			</section>
		</div>
	);
};

export default Input;
