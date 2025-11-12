import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'dark';
  fullWidth?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  fullWidth = false 
}) => {

  const className = `
    btn-nyl 
    ${variant === 'dark' ? 'btn-nyl-dark' : ''}
    ${fullWidth ? 'w-100' : ''} 
  `;

  return (
    <button
      type={type}
      className={className.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;