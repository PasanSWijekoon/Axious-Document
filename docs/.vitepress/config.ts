export default {
  title: "Axious - Tea Weight Scale System V.3",
  description: "Tea Weight Scale System Prototype Documentation V.3",
  lang: 'en-US',
  cleanUrls: true,
  // If this is disabled, when building it it will give deadlink errors if your markdown has the wrong links
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: "/logo.png",
    siteTitle: "Axious",
    search: {
      provider: "local",
    },
    // Navbar Link
    nav: [
      { text: "About", link: "/about" },
      { text: "Contact", link: "/contact" },
     // { text: "Guide", link: "/guide" },
      
    ],
    // Social Icons
    socialLinks: [
      { icon: "github", link: "https://github.com/PasanSWijekoon" },
      { icon: "twitter", link: "https://x.com/pasan_wijekoon" },
      { icon: "instagram", link: "https://www.instagram.com/pasanwijekoon" },
      
    ],
    // Sidebar
    sidebar: [
      {
        text: "Project Overview",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getstarted" },
        ],
      },
      {
        text: "System Components",
        collapsible: true,
        items: [
          { text: "All Components", link: "/Components" },
        ],
      },
      {
        text: "System Flow",
        collapsible: true,
        items: [
          { text: "All Workflows", link: "/workflow" },
        ],
      },
      {
        text: "System Architecture",
        collapsible: true,
        items: [
          { text: "Hardware Integration", link: "/hardwareintegration" },
          { text: "Wireframes", link: "/wireframes" },
          { text: "Database Design", link: "/databasedesign" },
          { text: "UML Diagrams", link: "/usecasediagrams" },
        ],
      },
      {
        text: "Implementation",
        collapsible: true,
        items: [
          { text: "Arduino Code", link: "/arduinocode" },
          { text: "App Images And Harware", link: "/appimages" },
        ],
      },
      {
        text: "Testing",
        collapsible: true,
        items: [
          { text: "Test Cases", link: "/testcases" },
          { text: "Debugging", link: "/debugging" },
        ],
      },
      {
        text: "Conclusion",
        collapsible: true,
        items: [
          { text: "Conclusion", link: "/conclusion" },
        ],
      }
    ],
    // you can disable the previous and next page here
    docFooter: {
      prev: false,
      next: true,
    },
  
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Project Axious",
    },
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
    // Mobile Config only
    returnToTopLabel: 'Go to Top',
    sidebarMenuLabel: 'Menu',
  },
};
