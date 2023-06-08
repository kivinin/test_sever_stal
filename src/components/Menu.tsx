import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/get">Get</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/delete">Delete</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
