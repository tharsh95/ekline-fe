import { useState } from "react";
import { DocumentList } from "./components/DocumentList";
import { DocumentViewer } from "./components/DocumentViewer";
import { UploadForm } from "./components/UploadForm";
import { FileText } from "lucide-react";
import {
  useDocuments,
  useUploadDocument,
  useDeleteDocument,
  useDocument,
} from "./api/documents";

function App() {
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { documents, isLoading, isError } = useDocuments();
  const { document } = useDocument(selectedDocument);

  const { uploadDocument } = useUploadDocument();
  const { deleteDocument } = useDeleteDocument();

  const handleUpload = async (file: File) => {
    try {
      await uploadDocument(file);
    } catch {
      setError("Failed to upload document");
    }
  };

  const handleDocumentClick = async (id: number) => {
    setSelectedDocument(id);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteDocument(id);
    } catch {
      setError("Failed to delete document");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex items-center space-x-3">
          <FileText size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Document Manager</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            Failed to fetch documents
          </div>
        )}

        <div className="mb-8">
          <UploadForm onUpload={handleUpload} />
        </div>

        {isLoading ? (
          <div>Loading documents...</div>
        ) : (
          <DocumentList
            documents={documents || []}
            onDocumentClick={handleDocumentClick}
            onDeleteClick={handleDeleteClick}
          />
        )}

        <DocumentViewer
          document={document}
          onClose={() => setSelectedDocument(null)}
        />
      </div>
    </div>
  );
}

export default App;
