import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.tsx";
import GetPage from "./components/pages/GetPage.tsx";
import PostPage from "./components/pages/PostPage.tsx";
import DeletePage from "./components/pages/DeletePage.tsx";
import ApiResponsePanel from "./components/ApiResponsePanel.tsx";

type ApiResponse = {
  time: string;
  method: string;
  url: string;
  data?: object;
  response: object;
};

function App() {
  const [apiResponses, setApiResponses] = React.useState<ApiResponse[]>([]);

  const handleApiResponse = (response: ApiResponse) => {
    const now = new Date();
    response.time = now.toISOString();
    setApiResponses([...apiResponses, response]);
  };

  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route
            path="/get"
            element={<GetPage onApiResponse={handleApiResponse} />}
          />
          <Route
            path="/post"
            element={<PostPage onApiResponse={handleApiResponse} />}
          />
          <Route
            path="/delete"
            element={<DeletePage onApiResponse={handleApiResponse} />}
          />
        </Routes>
        <ApiResponsePanel apiResponses={apiResponses} />
      </div>
    </Router>
  );
}

export default App;
