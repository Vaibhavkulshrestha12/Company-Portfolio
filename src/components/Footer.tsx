import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: Facebook, href: '#facebook', id: 'facebook' },
  { icon: Twitter, href: '#twitter', id: 'twitter' },
  { icon: Instagram, href: '#instagram', id: 'instagram' },
  { icon: Linkedin, href: '#linkedin', id: 'linkedin' },
];

const quickLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Quaxis</span>
            </Link>
            <p className="mt-4 max-w-md text-gray-400">
              Delivering innovative solutions that drive growth and success for businesses of all sizes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, id }) => (
                <a
                  key={id}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Quaxis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}