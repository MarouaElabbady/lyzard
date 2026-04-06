import apiClient from './client';

/**
 * Trigger a ZIP export of the project's latest version.
 * The response is a binary blob — we trigger a browser download automatically.
 */
export const exportProject = async (id: string | number, projectName: string): Promise<void> => {
  const response = await apiClient.post(
    `/v1/projects/${id}/export`,
    {},
    { responseType: 'blob' }
  );

  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
  const link = document.createElement('a');
  const filename = projectName.replace(/[^a-z0-9\-_]/gi, '_') + '.zip';
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};
