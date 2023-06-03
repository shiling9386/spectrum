import { useState } from "react";

export const ToggleDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);
  return <button onClick={() => setDarkMode((x) => !x)}>Click me {darkMode}</button>;
};
