const Filter = (props) => {
	const { todos, filter, setFilter } = props;
	const changeSelected = (filterName) => () => setFilter(filterName);
	const handleClearCompleted = () => {
		props.clearAllCompleted();
	};
	const noCompleted = todos.reduce(
		(pre, todo) => pre + (todo.completed ? 0 : 1),
		0,
	);

	return (
		<div
			className="footer"
			style={{ display: todos.length ? "block" : "none" }}
		>
			<span className="todo-count">{noCompleted} item left</span>
			<ul className="filters">
				<li>
					<a
						href="#/"
						onClick={changeSelected("all")}
						className={filter === "all" ? "selected" : ""}
					>
						All
					</a>
				</li>
				<li>
					<a
						href="#/active"
						onClick={changeSelected("active")}
						className={filter === "active" ? "selected" : ""}
					>
						Active
					</a>
				</li>
				<li>
					<a
						href="#/completed"
						onClick={changeSelected("completed")}
						className={filter === "completed" ? "selected" : ""}
					>
						Completed
					</a>
				</li>
			</ul>
			<button onClick={handleClearCompleted} className="clear-completed">
				Clear completed
			</button>
		</div>
	);
};

export default Filter;
