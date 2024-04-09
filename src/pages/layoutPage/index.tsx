import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUniversity } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
        </ul>
        <div className="contesta-link">
          <Link to="/contesta">
            <FontAwesomeIcon icon={faUniversity} />
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
