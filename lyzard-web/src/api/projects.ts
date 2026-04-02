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

export interface ProjectVersion {
  id: string;
  project_id: number;
  content: string;
  prompt?: string;
  created_at: string;
}

export interface ProjectWithVersions extends Project {
  versions?: ProjectVersion[];
}

export const getProject = (id: string | number): Promise<ProjectWithVersions> =>
  apiClient.get(`/v1/projects/${id}`).then((r) => r.data);

export interface ProjectVersionsResponse {
  data: ProjectVersion[];
  current_page: number;
  last_page: number;
  total: number;
}

export const getProjectVersions = (id: string | number): Promise<ProjectVersionsResponse> =>
  apiClient.get(`/v1/projects/${id}/versions`).then((r) => r.data);

export const saveProjectVersion = (id: string | number, content: string, prompt?: string): Promise<ProjectVersion> =>
  apiClient.post(`/v1/projects/${id}/versions`, { content, prompt }).then((r) => r.data);
