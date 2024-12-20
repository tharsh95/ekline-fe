import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { Document } from '../types/Document';

interface DocumentListProps {
  documents: Document[];
  onDocumentClick: (_id: number) => void;
  onDeleteClick: (_id: number) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDocumentClick,
  onDeleteClick,
}) => {

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div
          key={doc._id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onDocumentClick(doc._id)}
            className="flex items-center space-x-3 flex-1"
          >
            <FileText className="text-blue-500" />
            <div>
              <h3 className="font-medium text-gray-900">{doc.filename}</h3>
              <p className="text-sm text-gray-500">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </div>
          </button>
          <button
            onClick={() => onDeleteClick(doc._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete document"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};