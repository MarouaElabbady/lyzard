import apiClient from './client';


export interface Project {
  id: number;
  name: string;
  status: 'pending' | 'active' | 'completed';
  settings: Record<string, unknown>;
  versions_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectsResponse {
  data: Project[];
  current_page: number;
  last_page: number;
  total: number;
}

export const getProjects = (): Promise<ProjectsResponse> =>
  apiClient.get('/v1/projects').then((r) => r.data);

export const createProject = (name: string): Promise<Project> =>
  apiClient.post('/v1/projects', { name }).then((r) => r.data);

export const deleteProject = (id: number): Promise<void> =>
  apiClient.delete(`/v1/projects/${id}`).then(() => undefined);

export const renameProject = (id: number, name: string): Promise<Project> =>
  apiClient.put(`/v1/projects/${id}`, { name }).then((r) => r.data);
