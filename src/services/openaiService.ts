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
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return {
      feedback: '',
      error: 'OpenAI API key is not configured. Please check your environment variables.'
    };
  }

  const defaultPrompt = `
Analyze this UI design screenshot and provide comprehensive UX/UI feedback. Please format your response in markdown and use relevant emojis to break up sections and highlight key points.

# 📝 Overall Assessment
Brief summary of the design's strengths and main areas for improvement.

# 🎨 Visual Design

## 🔢 Hierarchy & Layout
- Is there clear visual hierarchy? Are the most important elements prominent?
- Is the layout balanced and purposeful? Are elements aligned properly?

## 🌈 Color & Contrast
- Is color used strategically for hierarchy and meaning?
- Is the color scheme accessible and visually appealing?

## 🔤 Typography
- Is typography consistent and readable?
- Are font weights and styles used purposefully?

## 📏 Spacing & Alignment
- Is spacing consistent and purposeful?
- Are elements properly grouped and separated?

# 🛠️ Tailwind-First Design
- 🧩 Utility-first approach: Are styles applied consistently?
- 📱 Responsive design: How well does it adapt to different screen sizes?
- 🧑‍🤝‍🧑 Component consistency: Are similar elements styled consistently?

# 🏷️ Brand Identity

## 😎 Brand Personality
- What personality traits does this design communicate?

## 🧙‍♂️ Jungian Archetype
- Which archetype does this design embody? (e.g., 🦸‍♂️ Hero, 🧙‍♂️ Sage, 🧭 Explorer, 🎨 Creator, etc.)

## 🗣️ Brand Voice
- How does the visual design reflect the brand's voice and values?

# 💡 Recommendations
- List specific, actionable improvements organized by priority.

# 🔧 Technical Notes
- Any technical considerations for implementation.

**Please use relevant emojis for each section and key point, and avoid empty bullet points or standalone asterisks. Be specific, constructive, and actionable in your feedback.**
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: request.prompt || defaultPrompt
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
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `API request failed: ${response.status} ${response.statusText}`
      );
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