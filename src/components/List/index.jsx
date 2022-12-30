import Item from "../Item";

const List = (props) => {
	const { todos, deleteTodo, completeTodo, editTodo, makeNewTodo } = props;
	return (
		<div style={{ display: "block" }} className="main">
			{todos.map((todo) => (
				<Item
					key={todo.id}
					{...todo}
					deleteTodo={deleteTodo}
					completeTodo={completeTodo}
					editTodo={editTodo}
					makeNewTodo={makeNewTodo}
				/>
			))}
		</div>
	);
};

export default List;
