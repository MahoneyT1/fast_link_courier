import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  buttonName: string,
  className?: string,
  titleStyle?: string,
  linkUrl?: string,
  onClickFunc?: ()=> void
};

const Button: React.FC<ButtonProps> = ({buttonName, onClickFunc, className, titleStyle, linkUrl }) => {
  return (
    <button 
      onClick={(onClickFunc)}
      className={`active:scale-95 active:shadow-sm transition-all duration-150 ${className}`}
      >

    {linkUrl ? (
        <Link className={`p-2 m-1 ${titleStyle}`} to={linkUrl} >
          {buttonName}
        </Link>
        ) : (
          <p className='px-4'>{buttonName}</p>
        )}
    </button>
  )
}

export default Button;
