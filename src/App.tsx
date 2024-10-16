import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
