import useSWR, { SWRConfiguration, mutate } from 'swr';

const API_URL = 'http://localhost:9090/api';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const useDocuments = (config?: SWRConfiguration) => {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/documents`, fetcher, config);

  return {
    documents: data,
    isLoading,
    isError: !!error,
    mutate,
  };
};


export const useDocument = (id: number | null, config?: SWRConfiguration) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${API_URL}/documents/${id}` : null,
    fetcher,
    config
  );

  return {
    document: data,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export const useUploadDocument = () => {
  const uploadDocument = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload document');
    }
    mutate(`${API_URL}/documents`);
  };

  return { uploadDocument };
};

export const useDeleteDocument = () => {
  const deleteDocument = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
    mutate(`${API_URL}/documents`);
  };

  return { deleteDocument };
};
