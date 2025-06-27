import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>NC News</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics/coding">Coding</Link>
          </li>
          <li>
            <Link to="/topics/cooking">Cooking</Link>
          </li>
          <li>
            <Link to="/topics/football">Football</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
