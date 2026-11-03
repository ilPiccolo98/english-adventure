import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`bg-[#FFF9F0] border-4 border-[#6C5CE7] rounded-3xl p-6 shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-2xl bg-white border-2 border-gray-200 text-[#26324A] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-[#6C5CE7] mb-4 text-center pr-8">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

