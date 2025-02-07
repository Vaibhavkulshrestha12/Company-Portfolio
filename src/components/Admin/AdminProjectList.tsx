import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { ProjectEditor } from './ProjectEditor';
import { subscribeToProjects, createProject, updateProject, deleteProject } from '@/lib/projects';
import type { Project } from '@/lib/projects';

export function AdminProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((updatedProjects) => {
      setProjects(updatedProjects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, projectData);
        toast.success('Project updated successfully');
      } else {
        await createProject(projectData);
        toast.success('Project created successfully');
      }
      setIsEditing(false);
      setSelectedProject(null);
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (project: Project) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project.id);
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Button onClick={() => setIsEditing(true)} size="sm">
          New Project
        </Button>
      </div>

      {isEditing ? (
        <div className="rounded-lg border border-gray-200 p-6">
          <ProjectEditor
            project={selectedProject}
            onSave={handleSave}
            onCancel={() => {
              setIsEditing(false);
              setSelectedProject(null);
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(project)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}