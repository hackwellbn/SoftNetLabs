import React from 'react';
import './Tests.css';

const GradientBackground = () => {
    const handleMouseMove = (e) => {
        createGradient(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
        // Get the first touch point
        const touch = e.touches[0];
        createGradient(touch.clientX, touch.clientY);
    };

    const createGradient = (x, y) => {
        const gradient = document.createElement('div');
        gradient.classList.add('cursor-gradient');
        gradient.style.left = `${x - 100}px`; // Center the gradient
        gradient.style.top = `${y - 100}px`; // Center the gradient

        document.body.appendChild(gradient);

        setTimeout(() => {
            gradient.remove();
        }, 500); // Adjust time for how long the gradient remains visible
    };

    return (
        <div 
            className="background" 
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove} // Handle touch events
        >
          test me
            {/* Additional content can go here */}
        </div>
    );
};

export default GradientBackground;
