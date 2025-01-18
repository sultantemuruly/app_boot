import {
  GoogleGenerativeAI,
  //   HarmCategory,
  //   HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process?.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAICode = model.startChat({
  generationConfig: codeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'CODE_GEN_PROMPT = dedent`\nGenerate a programming code structure for a React project using Vite. Create multiple components and organize them effectively.\n\nReturn the response in JSON format with the following schema:\n{\n    "projectTitle": "",\n    "explanation": "",\n    "files": {\n        "/App.js": {\n            "code": "import React from \'react\';\\\\nimport \'./styles.css\';\\\\nexport default App;"\n        }\n    },\n    "generatedFiles": []\n}\n\nEnsure the files field contains all created files, and the generatedFiles field includes the necessary files.\n\nAdditionally, include an explanation of the project’s structure, purpose, and usage:\n- For placeholder images, please use resources like https://archive.org/download/.\n- Add emoji icons wherever needed to enhance the user experience.\n- The lucide-react library is also available to be imported if necessary.\n\n**Important**: Please place the \\`App.js\\` file in the root folder (i.e., \\`"/App.js"\\`) **not** inside a \\`src\\` directory. If \\`App.js\\` already exists, override it.\n`;\n\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "projectTitle": "React Todo App",\n  "explanation": "This project is a simple Todo application built with React and Vite. It allows users to add, mark as complete, and delete tasks. The application is structured using multiple components for better organization and maintainability. The project also incorporates the use of emoji icons for a better user experience.\\n\\n**Structure:**\\n- `App.js`: The main entry point of the application. It manages the overall layout and contains the main components.\\n- `components/TodoList.jsx`: Renders the list of todos and provides functionality to add a new todo item.\\n- `components/TodoItem.jsx`: Represents a single todo item with functionality to mark it as complete or delete it.\\n- `styles.css`: Contains the global styles for the application.\\n\\n**Purpose:**\\nThis app is designed to be a basic example of how to use React and components to build an interactive user interface for managing tasks.\\n\\n**Usage:**\\n- The app starts with an empty todo list. \\n- Users can type a new todo item in the input field and press enter to add it to the list.\\n- Each todo item can be marked as complete or deleted.\\n- The app provides a simple, clear interface for these actions. Placeholder images are not used in this version, focusing solely on the core functionality and basic styling.",\n  "files": {\n    "/App.js": {\n      "code": "import React from \'react\';\\nimport TodoList from \'./components/TodoList\';\\nimport \'./styles.css\';\\n\\nfunction App() {\\n  return (\\n    <div className=\\"app-container\\">\\n      <h1>📝 Todo App</h1>\\n      <TodoList />\\n    </div>\\n  );\\n}\\n\\nexport default App;"\n    },\n     "/styles.css": {\n        "code": ".app-container {\\n  font-family: sans-serif;\\n  max-width: 600px;\\n  margin: 20px auto;\\n  padding: 20px;\\n  border: 1px solid #ddd;\\n  border-radius: 8px;\\n  background-color: #f9f9f9;\\n}\\n\\nh1 {\\n  text-align: center;\\n  margin-bottom: 20px;\\n}\\n\\n.todo-list {\\n  list-style: none;\\n  padding: 0;\\n}\\n\\n.todo-item {\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  padding: 10px;\\n  border-bottom: 1px solid #eee;\\n}\\n\\n.todo-item:last-child {\\n  border-bottom: none;\\n}\\n\\n.todo-item.completed {\\n    text-decoration: line-through;\\n    color: #aaa;\\n}\\n\\n.todo-actions button {\\n  margin-left: 5px;\\n  padding: 5px 10px;\\n  border: none;\\n  border-radius: 4px;\\n  cursor: pointer;\\n  background-color: #f0f0f0;\\n}\\n\\n.todo-actions button:hover {\\n  background-color: #e0e0e0;\\n}\\n\\n.todo-actions button.delete {\\n background-color: #f44336; \\n color: #fff;\\n}\\n\\n.todo-actions button.delete:hover {\\n background-color: #d32f2f;\\n}\\n\\n\\n.add-todo {\\n    display: flex;\\n    margin-bottom: 20px;\\n}\\n\\n.add-todo input{\\n    flex-grow: 1;\\n    padding: 10px;\\n    border: 1px solid #ccc;\\n    border-radius: 4px;\\n    margin-right: 10px;\\n}\\n\\n.add-todo button {\\n    padding: 10px 15px;\\n    border: none;\\n    border-radius: 4px;\\n    background-color: #4caf50;\\n    color: white;\\n    cursor: pointer;\\n}\\n\\n.add-todo button:hover {\\n    background-color: #388e3c;\\n}"\n    },\n    "/components/TodoList.jsx": {\n      "code": "import React, { useState } from \'react\';\\nimport TodoItem from \'./TodoItem\';\\n\\nfunction TodoList() {\\n  const [todos, setTodos] = useState([]);\\n  const [newTodo, setNewTodo] = useState(\'\');\\n\\n  const addTodo = () => {\\n    if (newTodo.trim() !== \'\') {\\n      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);\\n      setNewTodo(\'\');\\n    }\\n  };\\n\\n  const handleKeyDown = (event) => {\\n     if (event.key === \'Enter\'){\\n          addTodo();\\n     }\\n  };\\n\\n\\n  const toggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  return (\\n    <div>\\n      <div className=\\"add-todo\\">\\n         <input\\n              type=\\"text\\"\\n              placeholder=\\"Add a new todo...\\"\\n              value={newTodo}\\n              onChange={(e) => setNewTodo(e.target.value)}\\n              onKeyDown={handleKeyDown}\\n          />\\n          <button onClick={addTodo}>➕ Add</button>\\n      </div>\\n      <ul className=\\"todo-list\\">\\n        {todos.map(todo => (\\n          <TodoItem\\n            key={todo.id}\\n            todo={todo}\\n            toggleComplete={toggleComplete}\\n            deleteTodo={deleteTodo}\\n          />\\n        ))}\\n      </ul>\\n    </div>\\n  );\\n}\\n\\nexport default TodoList;"\n    },\n    "/components/TodoItem.jsx": {\n      "code": "import React from \'react\';\\n\\nfunction TodoItem({ todo, toggleComplete, deleteTodo }) {\\n  return (\\n    <li className={`todo-item ${todo.completed ? \'completed\' : \'\'}`}>\\n      <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>\\n      <div className=\'todo-actions\'>\\n      <button  onClick={() => toggleComplete(todo.id)}>✔️</button>\\n        <button className=\'delete\' onClick={() => deleteTodo(todo.id)}>🗑️</button>\\n        </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"\n    }\n  },\n  "generatedFiles": [\n    "/App.js",\n    "/styles.css",\n     "/components/TodoList.jsx",\n      "/components/TodoItem.jsx"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
