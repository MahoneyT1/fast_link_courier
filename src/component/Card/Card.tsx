import React from 'react';
import "./Card.css"

interface CardParameters {
    cardIcon?: string | React.ElementType;
    cardTitle?: string;
    cardBody?: string;
    cardLink?: string;
    className: string,
    iconClass?: string,
    iconStyle?: string
}

const Card: React.FC<CardParameters> = ({
  cardIcon, cardTitle, cardBody, cardLink, className, iconClass, iconStyle }) => {
  return (
    <div className={`min-w-[230px] h-[280px] /* Fixed height */ 
        rounded-2xl 
        flex flex-col overflow-hidden hover:bg-green-100 ${className}`}> 
      
      {/* Icon Section (Fixed height) */}
      <div className='flex justify-center pt-6 pb-4'>
        
        {/* apply style around the icon */}
        <span className={`rounded text-3xl ${iconClass}`}>
          <i className={`${cardIcon } ${iconStyle}`}></i>
        </span>
      </div>

      {/* Title Section (Fixed height) */}
      <div className='px-4'>
        <h6 className='text-2xl font-semibold bg-gradient-to-r from-primary to-green-500 text-transparent bg-clip-text text-center'>
          {cardTitle}
        </h6>
      </div>

      {/* Body Section (Flexible with scroll) */}
      <div className='px-4 mt-3 flex-1 overflow-y-auto /* Scroll when needed */
          text-gray-500 text-lg text-center leading-6'>
        <p>{cardBody}</p>
      </div>

      {/* Link Section (Fixed height at bottom) */}
      {cardLink && (
        <div className='px-4 pb-4 pt-2'>
          <p className='text-blue-400 font-semibold text-sm text-center'>
            {cardLink}
            <i className="fas fa-chevron-right text-xs ml-1"></i>
          </p>
        </div>
      )}
    </div>
  )
}

export default Card;