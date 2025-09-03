import React, { useState } from 'react';
import { AnnouncementForm } from './components/AnnouncementForm.js';
import { PreviewPanel } from './components/PreviewPanel.js';
import { Header } from './components/Header.js';
import { type AnnouncementInput, type GeneratedAnnouncement, Tone, Format } from './types.js';
import { generateAnnouncementText, generateAnnouncementImage } from './services/geminiService.js';

const App: React.FC = () => {
  const [announcementInput, setAnnouncementInput] = useState<AnnouncementInput>({
    title: '가정통신문: 여름방학 특별활동 안내',
    target: '학부모 및 학생',
    content: '여름방학을 맞이하여 학생들의 창의력과 탐구심을 증진시키기 위한 다양한 특별활동 프로그램을 마련했습니다. 신청 기간과 방법을 확인해주세요.',
    tone: Tone.FRIENDLY,
    format: Format.NEWSLETTER,
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedAnnouncement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const textResult = await generateAnnouncementText(announcementInput);
      
      const imagePrompt = `A clean, friendly, illustrative image for a school announcement about "${textResult.title}". The style should be simple, professional, and welcoming, using soft pastel colors. No text in the image.`;
      const imageUrl = await generateAnnouncementImage(imagePrompt);

      setGeneratedContent({
        ...textResult,
        imageUrl,
      });

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('콘텐츠 생성 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <AnnouncementForm 
            input={announcementInput}
            setInput={setAnnouncementInput}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <PreviewPanel 
            content={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;