import { useState, useEffect } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Filter from "./components/Filter";
import "./App.css";

const App = () => {
	const useSemiPersistentState = (key, initialState) => {
		const [value, setValue] = useState(
			() => JSON.parse(localStorage.getItem(key)) || initialState,
		);
		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(value));
		}, [value, key]);
		return [value, setValue];
	};

	const [todos, setTodos] = useSemiPersistentState("todoList", []);
	const [filter, setFilter] = useState("all");

	const addTodo = (todo) => {
		setTodos((todos) => [todo, ...todos]);
	};
	const deleteTodo = (id) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== id));
	};
	const completeTodo = (id, completed) => {
		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === id) return { ...todo, completed };
				else return todo;
			}),
		);
	};
	const editTodo = (id) => {
		setTodos((todos) =>
			todos.map((todo) => {
				if (id === todo.id) return { ...todo, editing: true };
				return { ...todo, editing: false };
			}),
		);
	};

	const completeAllTodos = (completed) => {
		setTodos((todos) =>
			todos.map((todo) => {
				return { ...todo, completed };
			}),
		);
	};
	const clearAllCompleted = () => {
		setTodos((todos) =>
			todos.filter((todo) => {
				return !todo.completed;
			}),
		);
	};
	const makeNewTodo = (id, value) => {
		setTodos((todos) =>
			todos.map((todo) => {
				if (todo.id === id)
					return { ...todo, content: value || todo.content, editing: false };
				else return todo;
			}),
		);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === "active") return !todo.completed;
		if (filter === "completed") return todo.completed;
		return true;
	});

	return (
		<div>
			<div className="todoapp">
				<Input
					todos={todos}
					addTodo={addTodo}
					completeAllTodos={completeAllTodos}
				/>
				<List
					todos={filteredTodos}
					deleteTodo={deleteTodo}
					completeTodo={completeTodo}
					editTodo={editTodo}
					makeNewTodo={makeNewTodo}
				/>
				<Filter
					todos={todos}
					filter={filter}
					setFilter={setFilter}
					clearAllCompleted={clearAllCompleted}
				/>
			</div>
		</div>
	);
};

export default App;
