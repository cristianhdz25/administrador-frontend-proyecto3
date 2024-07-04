import React, { useState } from 'react';
import { Toggle } from "keep-react";

const SwitchComponent = () => {
  const [isActive, setIsActive] = useState(true);  // Inicializado como true

  const handleToggle = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <Toggle 
      bgColor="primary"
      label={isActive ? "Activo" : "Inactivo"} 
      size="md" 
      withIcon={true} 
      checked={isActive}
      onChange={handleToggle}
      defaultChecked={true}  // Establecido como true
    />
  );
};

export default SwitchComponent;