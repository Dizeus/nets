import {NavLink } from "react-router-dom";
import '../../styles/css/Sidebar.css'
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__container">
                <nav className="sidebar__navbar">
                    <NavLink className="sidebar__link" to="/home">Home</NavLink>
                    <NavLink className="sidebar__link" to="/messages">Messages</NavLink>
                    <NavLink className="sidebar__link" to="/friends">Friends</NavLink>
                    <NavLink className="sidebar__link" to="/communities">Communities</NavLink>
                    <NavLink className="sidebar__link" to="/games">Games</NavLink>
                    <NavLink className="sidebar__link" to="/settings">Settings</NavLink>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;