import scss from "./NavBar.module.scss";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header className={scss.header}>
            <div className={scss.logo}>
                <Link to="/">
                    <img className={scss.logo_img} src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    );
};

export default NavBar;
