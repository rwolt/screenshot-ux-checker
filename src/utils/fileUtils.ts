/**
 * Converts a File object to base64 string
 * @param file - The file to convert
 * @returns Promise<string> - The base64 string without the data URL prefix
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Validates if a file is an image and within size limits
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns boolean - Whether the file is valid
 */
export const validateImageFile = (file: File, maxSizeMB: number = 5): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  return validTypes.includes(file.type) && file.size <= maxSizeBytes;
}; 