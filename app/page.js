"use client";

import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  // Fetch todos from the backend API
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      if (response.data.success) {
        setTodoData(response.data.todos);
      } else {
        throw new Error(response.data.error || "Failed to fetch todos");
      }
    } catch (error) {
      toast.error("Failed to fetch todos! Please try again.");
    }
  };

  // Handle delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete("/api", {
        params: { mongoId: id },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTodos(); // Refresh todos
      } else {
        throw new Error(response.data.error || "Failed to delete todo");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle completing a todo
  const completeTodo = async (id) => {
    try {
      const response = await axios.put(
        "/api",
        {},
        {
          params: { mongoId: id },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTodos(); // Refresh todos
      } else {
        throw new Error(response.data.error || "Failed to complete todo");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData); // Sending POST request
      if (response.data.success) {
        toast.success(response.data.message);
        fetchTodos(); // Refresh todos after adding
        setFormData({ title: "", description: "" });
      } else {
        throw new Error(response.data.error || "Failed to add todo");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />

      {/* Form for adding todos */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />

        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>

        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      {/* Table to Display Todos */}
      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo
                key={item._id} // Using MongoDB `_id` as a unique key
                id={index + 1} // Displaying index starting from 1
                title={item.title}
                description={item.description}
                complete={item.isCompleted}
                mongoId={item._id}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
