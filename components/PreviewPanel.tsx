
import React, { useState } from 'react';
import { type GeneratedAnnouncement } from '../types.ts';
import { ClipboardIcon } from './icons/ClipboardIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { ExclamationIcon } from './icons/ExclamationIcon.tsx';

interface PreviewPanelProps {
  content: GeneratedAnnouncement | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-64 bg-slate-200 rounded-lg w-full mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
    </div>
);

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ content, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!content) return;
        const textToCopy = `${content.title}\n\n${content.content}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!content) return;
        const link = document.createElement('a');
        link.href = content.imageUrl;
        link.download = `${content.title.replace(/ /g, '_')}_image.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mt-8 lg:mt-0 min-h-[500px]">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">2. 생성 결과 미리보기</h2>
        <div className="bg-slate-50 p-4 rounded-lg border min-h-[400px] flex flex-col justify-center">
            {isLoading && <LoadingSkeleton />}
            {error && !isLoading && (
                <div className="text-center text-slate-700">
                    <div className="text-red-500"><ExclamationIcon /></div>
                    <p className="font-semibold mt-2 text-red-600">오류 발생</p>
                    <p className="text-sm whitespace-pre-wrap mt-2 p-2 bg-red-50 rounded-md">{error}</p>
                </div>
            )}
            {!isLoading && !error && !content && (
                <div className="text-center text-slate-500">
                    <p>공지 내용을 입력하고 생성 버튼을 누르면</p>
                    <p>이곳에 AI가 만든 결과가 표시됩니다.</p>
                </div>
            )}
            {content && !isLoading && (
                <div>
                    <img src={content.imageUrl} alt="생성된 공지 이미지" className="w-full h-auto object-cover rounded-lg mb-4 border" />
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">{content.title}</h3>
                    <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{content.content}</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={handleCopy} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            {copied ? <CheckIcon/> : <ClipboardIcon />}
                            {copied ? '복사 완료!' : '텍스트 복사하기'}
                        </button>
                        <button onClick={handleDownload} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            <DownloadIcon />
                            이미지 다운로드
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};