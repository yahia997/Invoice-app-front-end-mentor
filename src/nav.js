import { useContext } from "react";
import { darkContext } from "./darkContext";
import Logo from "./images/logo.png";
import avatar from "./images/avatar.jpeg";


export default function Nav({setMood}) {
    const modehandleChange = useContext(darkContext);

    function toggle() {
        const old = JSON.parse(localStorage.getItem("mode"));
        localStorage.setItem("mode", !old);
        setMood(old => !old);
    }

    return (
        <nav>
            <div>
                <img src={Logo} alt="logo"/>
            </div>
            <div className="two">
                <div className="line-sparator center">
                    <button
                        aria-label="dark-light mode"
                        data={modehandleChange ? "light" : "dark"}
                        onClick={toggle}
                    ></button>
                </div>
                <div className="center avatar">
                    <img src={avatar} alt="avatar"/>
                </div>
            </div>
        </nav>
    );
}