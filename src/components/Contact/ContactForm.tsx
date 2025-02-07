import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { services } from '../Services/services.data';
import { submitContactForm } from '@/lib/contact';

interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          {...register('name', { 
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service
        </label>
        <select
          {...register('service', { required: 'Please select a service' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Send Message
      </Button>
    </form>
  );
}