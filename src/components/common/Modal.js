import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-blue-500/30 rounded-2xl max-w-3xl w-11/12 max-h-[90vh] overflow-auto shadow-2xl shadow-blue-500/20 animate-modalEnter">
        <div className="relative p-6">
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 p-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:rotate-90 hover:scale-110"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="pt-6 text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;