import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadFormProps {
  onUpload: (file: File) => Promise<void>;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      await onUpload(files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          accept=".txt"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} className="mr-2" />
          Upload
        </button>
      </div>
    </form>
  );
};