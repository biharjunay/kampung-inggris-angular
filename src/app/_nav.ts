export interface INavData {
  name: string;
  url: string;
  icon: string;
  roles: string[];
}

export default [
  {
    name: 'Dashboard',
    url: 'dashboard',
    icon: 'fa-solid fa-grid',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Products',
    url: 'products',
    icon: 'fa-solid fa-window',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Benefits',
    url: 'benefits',
    icon: 'fa-solid fa-dollar',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Testimonials',
    url: 'testimonials',
    icon: 'fa-solid fa-comments',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Articles',
    url: 'articles',
    icon: 'fa-solid fa-newspaper',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Video Gallery',
    url: 'video-gallery',
    icon: 'fa-brands fa-youtube',
    roles: ['admin', 'superadmin']
  },
  {
    name: 'Users',
    url: 'users',
    icon: 'fa-solid fa-users',
    roles: ['superadmin']
  }
] satisfies INavData[]
