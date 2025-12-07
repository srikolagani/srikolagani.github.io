import React, { useEffect, useRef } from 'react';

interface PromptProps {
    input: string;
    setInput: (value: string) => void;
    onEnter: () => void;
    onHistoryNavigate: (direction: 'up' | 'down') => void;
}

export const Prompt: React.FC<PromptProps> = ({ input, setInput, onEnter, onHistoryNavigate }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onEnter();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            onHistoryNavigate('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            onHistoryNavigate('down');
        }
    };

    return (
        <div className="flex items-center w-full font-mono">
            <span className="text-claude-link mr-1">❯</span>
            <span className="text-claude-text">{input}</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                }}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
            />
            <span className="text-claude-text cursor-blink">▌</span>
        </div>
    );
};
