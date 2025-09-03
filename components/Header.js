import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-5 lg:px-8">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.102 1.99 17.89 1 17.22 1H4.634a1 1 0 00-1 1.45l2.454 6.133z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
                스마트 학교 공지 생성기
            </h1>
        </div>
        <p className="text-slate-500 mt-1">AI로 학교 공지사항을 쉽고 빠르게 만들어보세요.</p>
      </div>
    </header>
  );
};