import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
// import ReactDatetimeClass from "react-datetime";
// import datedisplayer from "./components/datedisplayer.jsx";
// import "react-datetime/css/react-datetime.css";

function App() {
  const [todo, settodo] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [todos, settodos] = useState([]);
   const [iscompleted, setIscompleted] = useState(false)
  const handleinput = (e) => {
    settodo(e.target.value);
  };

  const handleclick = () => {
    if (visibility === "hidden") {
      setVisibility("visible");
    } else {
      setVisibility("hidden");
    }
  };

  const handleenter = (e) => {
    if (e.key === "Enter") {
      handleadding(todo);
    }
  };

  const handleadding = (todo) => {
    settodos([...todos, todo]);
    settodo(""); // Clear the input field after adding
  };
  const handleDelete = (e) => {
    const index = parseInt(e.target.name); 
    settodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      {/* <datedisplayer> </datedisplayer> */}
      <div className="flex align items-center justify-between">
        <div className="heading font-bold text-3xl my-3 mx-10">
          <h2>TODAY'S TASKS</h2>
        </div>
        <div style={{ visibility: visibility }}>
          <input
            type="text"
            onChange={handleinput}
            onKeyDown={handleenter}
            value={todo}
            className="w-[500px] h-[100px] border-solid border-black text-start rounded-2xl mr-14 mt-14"
            placeholder="enter your task"
          />
          <button
            className="border-solid border-2 border-sky-600 p-2 text-sky-600 bg-sky-200 rounded-lg"
            onClick={() => handleadding(todo)}
          >
            Add
          </button>
        </div>
        <div className="taskaddingbutton mx-12">
          <button
            className="border-solid border-2 border-sky-600 p-2 text-sky-600 bg-sky-200 rounded-lg"
            onClick={handleclick}
          >
            New Task
          </button>
        </div>
      </div>

      <div className="tasklist mx-10 my-5">
        <ul>
          {todos.map((task, index) => (
            <div key={index} className="flex">  
            <input type="radio"  name={index} id="delete" value={iscompleted} onClick={handleDelete} />
            <li key={index} className=" px-4">{task}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
