
import { GoogleGenAI, Type } from "@google/genai";
import { type AnnouncementInput, Tone, Format } from '../types';

const getAiClient = (): GoogleGenAI => {
    const apiKey = sessionStorage.getItem('GEMINI_API_KEY');
    if (!apiKey) {
        throw new Error(
            "Gemini API 키가 설정되지 않았습니다.\n" +
            "F12를 눌러 개발자 콘솔을 열고 아래 명령어를 실행하여 키를 등록해주세요.\n\n" +
            "sessionStorage.setItem('GEMINI_API_KEY', '여기에_당신의_API_키를_붙여넣으세요')"
        );
    }
    return new GoogleGenAI({ apiKey });
};


function getToneDescription(tone: Tone): string {
    switch (tone) {
        case Tone.FORMAL: return '정중하고 격식 있는 톤';
        case Tone.FRIENDLY: return '친근하고 따뜻한 톤';
        case Tone.URGENT: return '긴급하고 중요한 내용을 강조하는 톤';
        default: return '일반적인 톤';
    }
}

function getFormatDescription(format: Format): string {
    switch (format) {
        case Format.NEWSLETTER: return '가정통신문 형식 (문단 구분, 상세 설명 포함)';
        case Format.WEB_POST: return '학교 웹사이트 게시물 형식 (간결하고 명확하게)';
        case Format.SOCIAL_MEDIA: return 'SNS 게시물 형식 (짧고 흥미를 끄는 문장, 이모지 사용 가능)';
        default: return '일반적인 글 형식';
    }
}


export async function generateAnnouncementText(input: AnnouncementInput): Promise<{ title: string; content: string }> {
    const prompt = `
        당신은 대한민국 학교 행정실의 유능한 직원입니다. 다음 정보를 바탕으로 지정된 톤과 형식에 맞춰 완벽한 학교 공지사항을 작성해주세요.
        
        - 공지 제목 (초안): ${input.title}
        - 공지 대상: ${input.target}
        - 핵심 내용: ${input.content}
        - 요청 톤: ${getToneDescription(input.tone)}
        - 최종 형식: ${getFormatDescription(input.format)}

        결과는 반드시 한국어로, 그리고 아래 JSON 형식에 맞춰 제목(title)과 내용(content)으로 구분하여 생성해주세요.
        내용(content)은 형식에 맞게 줄바꿈(\\n)을 포함하여 가독성 좋게 작성해주세요.
    `;

    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: "AI가 새로 생성한 공지사항의 제목입니다."
                        },
                        content: {
                            type: Type.STRING,
                            description: "AI가 형식과 톤에 맞춰 새로 생성한 공지사항의 본문입니다. 줄바꿈은 \\n으로 표현됩니다."
                        }
                    },
                    required: ["title", "content"]
                }
            }
        });

        const jsonText = response.text;
        const parsedResult = JSON.parse(jsonText);

        if (typeof parsedResult.title === 'string' && typeof parsedResult.content === 'string') {
            return parsedResult;
        } else {
            throw new Error("Invalid JSON structure from API");
        }
    } catch (error) {
        console.error("Error generating announcement text:", error);
        if (error instanceof Error) {
            throw error; // Re-throw the original error to be caught by the UI
        }
        throw new Error("Failed to generate text from Gemini API.");
    }
}


export async function generateAnnouncementImage(prompt: string): Promise<string> {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        if (error instanceof Error) {
            throw error; // Re-throw the original error
        }
        throw new Error("Failed to generate image from Imagen API.");
    }
}