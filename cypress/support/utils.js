export const updateProjectData = (projects, updatedProject) => {
  return projects.map((project) => (project.id === updatedProject.id ? { ...project, ...updatedProject } : project))
}
