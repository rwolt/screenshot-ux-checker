import { useState } from 'react';
import { fileToBase64, validateImageFile } from '../utils/fileUtils';
import { analyzeScreenshotWithOpenAI } from '../services/openaiService';
import type { OpenAIAnalysisRequest } from '../services/openaiService';

export interface UseScreenshotAnalysisReturn {
  analyzeScreenshot: (file: File, prompt?: string) => Promise<string>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useScreenshotAnalysis = (): UseScreenshotAnalysisReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = () => setError(null);

  const analyzeScreenshot = async (file: File, prompt?: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      // Validate file
      if (!validateImageFile(file)) {
        throw new Error('Invalid file. Please upload a PNG or JPG file under 5MB.');
      }

      // Convert to base64
      const base64Image = await fileToBase64(file);
      
      // Prepare request
      const request: OpenAIAnalysisRequest = {
        base64Image,
        prompt
      };

      // Call API
      const response = await analyzeScreenshotWithOpenAI(request);
      
      if (response.error) {
        throw new Error(response.error);
      }

      return response.feedback;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeScreenshot,
    loading,
    error,
    resetError
  };
}; 