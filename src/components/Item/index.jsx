const Item = (props) => {
	const { content, id, completed, editing } = props;
	const handleDelete = (id) => {
		props.deleteTodo(id);
	};
	const handleCompleted = (id) => (e) => {
		props.completeTodo(id, e.target.checked);
	};
	const beEditing = (id) => {
		props.editTodo(id);
	};
	const handleEdit = (id) => (e) => {
		const { keyCode, target, type } = e;
		const value = target.value.trim();
		if (type === "keyup") {
			if (keyCode === 13) props.makeNewTodo(id, value);
		}
		if (type === "blur") props.makeNewTodo(id, value);
	};

	return (
		<ul className="todo-list">
			<li className={editing ? "editing" : completed ? "completed" : ""}>
				<div onDoubleClick={() => beEditing(id)} className="view">
					<input
						className="toggle"
						type="checkbox"
						onChange={handleCompleted(id)}
						checked={completed}
					/>
					<label>{content}</label>
					<button onClick={() => handleDelete(id)} className="destroy"></button>
				</div>
				<input
					onBlur={handleEdit(id)}
					onKeyUp={handleEdit(id)}
					className="edit"
					defaultValue={content}
				/>
			</li>
		</ul>
	);
};

export default Item;
