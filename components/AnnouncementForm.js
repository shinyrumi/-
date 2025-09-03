import React from 'react';
import { Tone, Format } from '../types.js';
import { SparklesIcon } from './icons/SparklesIcon.js';
import { LoadingSpinner } from './icons/LoadingSpinner.js';

export const AnnouncementForm = ({ input, setInput, onSubmit, isLoading }) => {
  const handleInputChange = (key, value) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">1. 공지 내용 입력</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-1">공지 제목 (초안)</label>
          <input
            type="text"
            id="title"
            value={input.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="예) 2학기 방과후 프로그램 신청 안내"
          />
        </div>

        <div>
          <label htmlFor="target" className="block text-sm font-medium text-slate-600 mb-1">공지 대상</label>
          <input
            type="text"
            id="target"
            value={input.target}
            onChange={(e) => handleInputChange('target', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="예) 1학년 학생 및 학부모"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-600 mb-1">핵심 내용</label>
          <textarea
            id="content"
            rows={5}
            value={input.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="공지에 포함될 주요 내용을 입력하세요. (날짜, 장소, 준비물 등)"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-600 mb-1">어조</label>
            <select
              id="tone"
              value={input.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            >
              <option value={Tone.FRIENDLY}>친근하게</option>
              <option value={Tone.FORMAL}>격식있게</option>
              <option value={Tone.URGENT}>긴급하게</option>
            </select>
          </div>
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-slate-600 mb-1">형식</label>
            <select
              id="format"
              value={input.format}
              onChange={(e) => handleInputChange('format', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            >
              <option value={Format.NEWSLETTER}>가정통신문</option>
              <option value={Format.WEB_POST}>웹사이트 게시물</option>
              <option value={Format.SOCIAL_MEDIA}>SNS 게시물</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                생성 중...
              </>
            ) : (
              <>
                <SparklesIcon />
                AI로 공지 생성하기
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};