import React from 'react';
import { X } from 'lucide-react';
import { Document } from '../types/Document';

interface DocumentViewerProps {
  document?: Document | null;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{document.filename}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-auto max-h-[calc(80vh-80px)]">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {document.content}
          </pre>
        </div>
      </div>
    </div>
  );
};