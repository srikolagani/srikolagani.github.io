import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { Prompt } from './Prompt';
import { CommandOutput } from './CommandOutput';

export const Terminal: React.FC = () => {
    const {
        history,
        input,
        setInput,
        executeCommand,
        historyIndex,
        setHistoryIndex,
        commandHistory,
        showWelcome,
    } = useTerminal();

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleEnter = () => {
        executeCommand(input);
        setInput('');
    };

    const handleHistoryNavigate = (direction: 'up' | 'down') => {
        if (direction === 'up') {
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else {
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    // Focus input on click anywhere
    const handleClick = () => {
        const inputEl = document.querySelector('input');
        inputEl?.focus();
    };

    return (
        <div
            className="min-h-screen w-full max-w-full bg-claude-bg p-4 md:p-8 font-mono overflow-x-hidden overflow-y-auto"
            onClick={handleClick}
        >
            <div className="w-full max-w-full pl-4 md:pl-8 pr-4 md:pr-8" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {/* Header */}
                {showWelcome && (
                    <div className="mb-8">
                        {/* Welcome Box */}
                        <div className="inline-block border border-claude-border rounded px-4 py-2 mb-6">
                            <span className="text-claude-text">✱</span>
                            <span className="text-claude-text"> Welcome to </span>
                            <span className="text-claude-link font-semibold">Sri Kolagani</span>
                            <span className="text-claude-text"> portfolio!</span>
                        </div>

                        {/* ASCII Art Name with Avatar */}
                        <div className="flex flex-col md:flex-row md:items-stretch gap-4 mb-6">
                            {/* Chunky ASCII Art Name */}
                            <pre
                                className="text-claude-text leading-none whitespace-pre overflow-x-auto"
                                style={{ fontSize: 'clamp(4px, 1.5vw, 14px)' }}
                            >
                                {`███████╗██████╗ ██╗
██╔════╝██╔══██╗██║
███████╗██████╔╝██║
╚════██║██╔══██╗██║
███████║██║  ██║██║
╚══════╝╚═╝  ╚═╝╚═╝
██╗  ██╗ ██████╗ ██╗      █████╗  ██████╗  █████╗ ███╗   ██╗██╗
██║ ██╔╝██╔═══██╗██║     ██╔══██╗██╔════╝ ██╔══██╗████╗  ██║██║
█████╔╝ ██║   ██║██║     ███████║██║  ███╗███████║██╔██╗ ██║██║
██╔═██╗ ██║   ██║██║     ██╔══██║██║   ██║██╔══██║██║╚██╗██║██║
██║  ██╗╚██████╔╝███████╗██║  ██║╚██████╔╝██║  ██║██║ ╚████║██║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝`}
                            </pre>
                            {/* Avatar */}
                            <div className="w-20 md:w-auto shrink-0 rounded overflow-hidden border border-claude-border">
                                <img
                                    src={`${import.meta.env.BASE_URL}avatar-pixel.png`}
                                    alt="Pixel avatar of Sri Kolagani"
                                    className="w-full md:w-auto md:h-full object-cover pixelated"
                                    style={{ maxHeight: '198px' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-claude-dim text-sm mb-6">
                            Director, CRM Engineering at Elastic | DBA Scholar at GlobalNXT University
                        </p>

                        {/* Menu Options - Responsive grid */}
                        <div className="mb-6">
                            <p className="text-claude-text mb-4">Select an option (enter number or name):</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px 16px', maxWidth: '100%' }} className="text-sm">
                                <div><span className="text-claude-link">1.</span> Summary</div>
                                <div><span className="text-claude-link">2.</span> Experience</div>
                                <div><span className="text-claude-link">3.</span> Skills</div>
                                <div><span className="text-claude-link">4.</span> Certifications</div>
                                <div><span className="text-claude-link">5.</span> Education</div>
                                <div><span className="text-claude-link">6.</span> Speaking</div>
                                <div><span className="text-claude-link">7.</span> Conferences</div>
                                <div><span className="text-claude-link">8.</span> Publications</div>
                                <div><span className="text-claude-link">9.</span> Volunteering</div>
                                <div><span className="text-claude-link">10.</span> Links</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Command History */}
                <div className="space-y-4">
                    {history.map((entry) => (
                        <div key={entry.id} className="space-y-2">
                            <div className="flex items-center">
                                <span className="text-claude-link mr-2">❯</span>
                                <span className="text-claude-text">{entry.command}</span>
                            </div>
                            <CommandOutput content={entry.output} />
                        </div>
                    ))}
                </div>

                {/* Current Prompt - Like a real terminal */}
                <div className="mt-4">
                    <Prompt
                        input={input}
                        setInput={setInput}
                        onEnter={handleEnter}
                        onHistoryNavigate={handleHistoryNavigate}
                    />
                </div>

                <div ref={bottomRef} />
            </div>
        </div>
    );
};
