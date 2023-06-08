import React, { useState } from "react";

function ApiResponsePanel({ apiResponses }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <h1>API Responses</h1>
      <button onClick={toggleCollapse}>
        {isCollapsed ? "Развернуть" : "Свернуть"}
      </button>
      {!isCollapsed && (
        <>
          {apiResponses.map((response, index) => (
            <div key={index}>
              <p>{response.url}</p>
              <p>{new Date(response.time).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ApiResponsePanel;
