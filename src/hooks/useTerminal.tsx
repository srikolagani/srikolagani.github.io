import { useState, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';

export type CommandHistory = {
    id: string;
    command: string;
    output: React.ReactNode;
    timestamp: Date;
};

export const useTerminal = () => {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [showWelcome] = useState(true);

    const executeCommand = useCallback((cmdString: string) => {
        const trimmedCmd = cmdString.trim().toLowerCase();
        if (!trimmedCmd) return;

        let output: React.ReactNode = '';

        // Match by number or name
        switch (trimmedCmd) {
            case '1':
            case 'professional summary':
            case 'summary':
                output = portfolioData.summary;
                break;

            case '2':
            case 'professional experience':
            case 'experience':
                output = portfolioData.experience;
                break;

            case '3':
            case 'core technical skills':
            case 'skills':
                output = portfolioData.skills;
                break;

            case '4':
            case 'certifications':
                output = portfolioData.certifications;
                break;

            case '5':
            case 'education':
                output = portfolioData.education;
                break;

            case '6':
            case 'speaking engagements & recognition':
            case 'speaking':
            case 'talks':
                output = portfolioData.talks;
                break;

            case '7':
            case 'conferences':
                output = portfolioData.conferences;
                break;

            case '8':
            case 'publications & research':
            case 'publications':
                output = portfolioData.publications;
                break;

            case '9':
            case 'volunteering':
                output = portfolioData.volunteering;
                break;

            case '10':
            case 'links':
            case 'contact':
                output = (
                    <div className="space-y-2">
                        <div>▶ Linkedin: <a href="https://www.linkedin.com/in/sriharideep/" target="_blank" rel="noopener noreferrer" className="text-claude-link hover:underline">https://www.linkedin.com/in/sriharideep/</a></div>
                        <div>▶ Blog/Portfolio: <a href="https://sfdcbrewery.github.io/" target="_blank" rel="noopener noreferrer" className="text-claude-link hover:underline">https://sfdcbrewery.github.io/</a></div>
                        <div>▶ Github: <a href="https://github.com/sfdcbrewery" target="_blank" rel="noopener noreferrer" className="text-claude-link hover:underline">https://github.com/sfdcbrewery</a></div>
                        <div>▶ ResearchGate: <a href="https://www.researchgate.net/profile/Sri-Hari-Deep-Kolagani-2" target="_blank" rel="noopener noreferrer" className="text-claude-link hover:underline">https://www.researchgate.net/profile/Sri-Hari-Deep-Kolagani-2</a></div>
                    </div>
                );
                break;

            case 'clear':
                setHistory([]);
                setCommandHistory(prev => [...prev, trimmedCmd]);
                return;

            case 'help':
                output = (
                    <div className="space-y-1">
                        <div><span className="text-claude-link">1.</span> Professional Summary</div>
                        <div><span className="text-claude-link">2.</span> Professional Experience</div>
                        <div><span className="text-claude-link">3.</span> Core Technical Skills</div>
                        <div><span className="text-claude-link">4.</span> Certifications</div>
                        <div><span className="text-claude-link">5.</span> Education</div>
                        <div><span className="text-claude-link">6.</span> Speaking Engagements & Recognition</div>
                        <div><span className="text-claude-link">7.</span> Conferences</div>
                        <div><span className="text-claude-link">8.</span> Publications & Research</div>
                        <div><span className="text-claude-link">9.</span> Volunteering</div>
                        <div><span className="text-claude-link">10.</span> Links</div>
                        <div className="mt-2"><span className="text-claude-link">clear</span> - Clear terminal</div>
                    </div>
                );
                break;

            default:
                output = (
                    <div className="text-claude-error">
                        Invalid option: {cmdString}
                        <br />
                        <span className="text-claude-dim">Enter a number (1-10) or section name. Type 'help' for options.</span>
                    </div>
                );
        }

        const newEntry: CommandHistory = {
            id: Date.now().toString(),
            command: cmdString,
            output,
            timestamp: new Date(),
        };

        setHistory(prev => [...prev, newEntry]);
        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);
    }, []);

    return {
        history,
        input,
        setInput,
        executeCommand,
        historyIndex,
        setHistoryIndex,
        commandHistory,
        showWelcome,
    };
};
