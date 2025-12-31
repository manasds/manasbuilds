export interface NavItem {
    label : string ;
    href : string ;
}

export const navbarConfig =  {
  logo: {
    src: '/assets/logo.png',
    alt: 'logo',
    width: 100,
    height: 100,
  },
  navItems: [
      {
        label: 'Blogs',
        href: '/blog',
      },
      {
        label: 'Projects',
        href: '/projects',
      },
    {
      label: 'Contact',
      href: '/contact',
    },
  ] as NavItem[],
};