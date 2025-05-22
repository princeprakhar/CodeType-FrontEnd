// src/components/typing/CodeEditor.tsx
import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
    content: string;
    language: string;
    userInput: string;
    currentIndex: number;
    onKeyPress: (key: string) => void;
    mistakePositions: number[];
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    content,
    userInput,
    currentIndex,
    onKeyPress,
    mistakePositions,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    // Auto-scroll to keep cursor in view
    useEffect(() => {
        if (cursorRef.current && containerRef.current) {
            const cursor = cursorRef.current;
            const container = containerRef.current;
            
            const cursorRect = cursor.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Check if cursor is below the visible area
            if (cursorRect.bottom > containerRect.bottom - 50) {
                cursor.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
            // Check if cursor is above the visible area
            else if (cursorRect.top < containerRect.top + 50) {
                cursor.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    }, [currentIndex]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log('KeyDown event:', e.key);
        
        // Handle all keys the same way - just pass them through
        onKeyPress(e.key);
    };

    const renderTypingArea = () => {
        const lines = content.split('\n');
        console.log('Rendering - currentIndex:', currentIndex, 'userInput length:', userInput.length, 'mistakes:', mistakePositions);

        return lines.map((line, lineIndex) => {
            const lineStartIndex = getLineStartIndex(lineIndex, lines);
            return (
                <div key={lineIndex} className="flex font-mono text-sm leading-relaxed min-h-[24px]">
                    <span className="text-gray-400 mr-4 select-none w-8 text-right shrink-0 pt-0.5">
                        {lineIndex + 1}
                    </span>
                    <div className="flex-1 relative">
                        <div className="flex flex-wrap">
                            {line.split('').map((char, charIndex) => {
                                const absoluteIndex = lineStartIndex + charIndex;
                                const isTyped = absoluteIndex < userInput.length;
                                const isMistake = mistakePositions.includes(absoluteIndex);
                                const isCurrentPosition = absoluteIndex === currentIndex;

                                let className = 'relative inline-block min-w-[8px] ';
                                if (isCurrentPosition) {
                                    className += 'bg-blue-300 animate-pulse ';
                                } else if (isTyped) {
                                    if (isMistake) {
                                        className += 'bg-red-200 text-red-800 ';
                                    } else {
                                        className += 'bg-green-100 text-green-800 ';
                                    }
                                } else {
                                    className += 'text-gray-600 ';
                                }
                                
                                return (
                                    <span 
                                        key={charIndex} 
                                        className={className}
                                        ref={isCurrentPosition ? cursorRef : undefined}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                );
                            })}
                            
                            {/* Render cursor at end of line */}
                            {currentIndex === lineStartIndex + line.length && (
                                <span 
                                    className="bg-blue-300 animate-pulse w-0.5 h-5 inline-block ml-0.5"
                                    ref={cursorRef}
                                />
                            )}
                        </div>
                        
                        {/* Empty line cursor */}
                        {line.length === 0 && currentIndex === lineStartIndex && (
                            <span 
                                className="bg-blue-300 animate-pulse w-0.5 h-5 inline-block absolute left-0 top-0"
                                ref={cursorRef}
                            />
                        )}
                    </div>
                </div>
            );
        });
    };

    const getLineStartIndex = (lineIndex: number, lines: string[]) => {
        let index = 0;
        for (let i = 0; i < lineIndex; i++) {
            index += lines[i].length + 1; // +1 for newline
        }
        return index;
    };

    return (
        <div className="relative">
            <div 
                ref={containerRef}
                className="bg-gray-50 rounded-md p-4 border min-h-[400px] max-h-[600px] overflow-auto scroll-smooth"
            >
                <div className="space-y-1">
                    {renderTypingArea()}
                </div>
            </div>
            
            <textarea
                ref={textareaRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                onKeyDown={handleKeyDown}
                placeholder=""
                style={{ caretColor: 'transparent' }}
                tabIndex={0}
                autoFocus
            />
            
            <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm pointer-events-none">
                Click to focus • Press any key to start
            </div>
            
            {/* Debug info */}
            <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm pointer-events-none">
                Index: {currentIndex} | Input: {userInput.length} | Mistakes: {mistakePositions.length}
            </div>
        </div>
    );
};