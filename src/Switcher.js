import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./Hooks/useDarkSide";

export default function Switcher () {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggelDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };


    return(
        <>
            <DarkModeSwitch 
                style={{ marginBottom : "1.4rem" }}
                checked={darkSide}
                onChange={toggelDarkMode}
                size={30}
            />
        </>
    )
}