import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

export async function submitContactForm(data: Omit<ContactFormData, 'createdAt'>) {
  try {
    const contactsRef = collection(db, 'contacts');
    await addDoc(contactsRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}