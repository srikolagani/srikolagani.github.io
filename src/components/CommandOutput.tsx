import React, { useState, useEffect, useRef } from 'react';

interface CommandOutputProps {
    content: React.ReactNode;
}

// Typing effect component with auto-scroll
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                // Type multiple characters at once for speed
                const charsToAdd = Math.min(5, text.length - currentIndex);
                setDisplayedText(prev => prev + text.slice(currentIndex, currentIndex + charsToAdd));
                setCurrentIndex(prev => prev + charsToAdd);
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text]);

    // Auto-scroll as text is typed
    useEffect(() => {
        if (containerRef.current) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [displayedText]);

    return (
        <div
            ref={containerRef}
            style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                maxWidth: '100%',
                fontFamily: 'Fira Code, monospace',
                fontSize: '14px',
                lineHeight: '1.6',
            }}
        >
            {displayedText}
            {currentIndex < text.length && <span className="cursor-blink">▌</span>}
        </div>
    );
};

export const CommandOutput: React.FC<CommandOutputProps> = ({ content }) => {
    if (typeof content === 'string') {
        return (
            <div style={{ paddingLeft: '24px', maxWidth: '100%', overflow: 'hidden' }}>
                <TypewriterText text={content} />
            </div>
        );
    }
    return (
        <div style={{ paddingLeft: '24px', maxWidth: '100%', overflow: 'hidden' }}>
            {content}
        </div>
    );
};
