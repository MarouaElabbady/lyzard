// Mock API for projects
export const apiProjects = {
  getProjects: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: {
        data: [
          { id: 1, name: "Modern SaaS Landing", versions_count: 3 },
          { id: 2, name: "E-commerce Showcase", versions_count: 5 },
          { id: 3, name: "Personal Portfolio", versions_count: 2 },
          { id: 4, name: "Lead Gen Funnel", versions_count: 1 },
        ]
      }
    };
  }
};
