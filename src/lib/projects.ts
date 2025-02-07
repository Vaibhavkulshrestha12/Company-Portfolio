import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { sampleProjects } from './sample-projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

let initialized = false;

async function initializeSampleProjects() {
  if (initialized) return;
  
  const projectsRef = collection(db, 'projects');
  const snapshot = await getDocs(projectsRef);
  
  if (snapshot.empty) {
    for (const project of sampleProjects) {
      const { id, ...projectData } = project;
      await addDoc(projectsRef, projectData);
    }
  }
  
  initialized = true;
}

export function subscribeToProjects(callback: (projects: Project[]) => void) {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, orderBy('title'));
  
  
  initializeSampleProjects();
  
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    callback(projects);
  });
}

export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, project);
    return { id: docRef.id, ...project };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, project: Partial<Project>) {
  try {
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, project);
    return { id, ...project };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const projectRef = doc(db, 'projects', id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}