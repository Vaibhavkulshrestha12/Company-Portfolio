import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from '@/lib/auth';
import { AdminBlogList } from '@/components/Admin/AdminBlogList';
import { AdminProjectList } from '@/components/Admin/AdminProjectList';
import { Button } from '@/components/ui/Button';
import { LayoutDashboard, FileText, Briefcase, LogOut, Menu, X } from 'lucide-react';

export function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { path: '/admin/projects', icon: Briefcase, label: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      
      <div className="fixed top-20 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full p-2"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

     
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${location.pathname.startsWith('/admin') ? 'mt-16 md:mt-0' : ''}`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <nav className="mt-6 px-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsSidebarOpen(false)}
              className={`mb-2 flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Link>
          ))}
          <Button
            variant="outline"
            onClick={handleSignOut}
            isLoading={loading}
            className="mt-4 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="min-h-screen md:ml-64">
        <div className="p-4 md:p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="blogs/*" element={<AdminBlogList />} />
            <Route path="projects/*" element={<AdminProjectList />} />
          </Routes>
        </div>
      </div>

      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function AdminOverview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Published Posts</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
      </div>
    </div>
  );
}