export interface OpenAIAnalysisRequest {
  base64Image: string;
  prompt?: string;
}

export interface OpenAIAnalysisResponse {
  feedback: string;
  error?: string;
}

/**
 * Analyzes a screenshot using OpenAI's GPT-4 Vision API
 * @param request - The analysis request containing the image and optional prompt
 * @returns Promise<OpenAIAnalysisResponse> - The analysis result
 */
export const analyzeScreenshotWithOpenAI = async (
  request: OpenAIAnalysisRequest
): Promise<OpenAIAnalysisResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: request.prompt || "Analyze this screenshot and provide UX feedback. Focus on design principles, usability, and potential improvements. Be specific and constructive."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${request.base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      feedback: data.choices[0].message.content
    };
  } catch (error) {
    return {
      feedback: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 