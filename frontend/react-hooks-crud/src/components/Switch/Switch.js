import React from "react";
import { useState, useEffect } from "react";

function Switch() {
  const [theme, setTheme] = useState('light');

  const handleChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="container-switch">
      
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
        <a>Change theme </a>
      </label>
    </div>
  );
}


  export default Switch;