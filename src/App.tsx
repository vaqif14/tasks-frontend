import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
