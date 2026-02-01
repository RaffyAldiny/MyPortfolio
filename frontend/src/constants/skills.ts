// src/constants/skills.ts

export type Skill = {
  name: string;
  color: string; // used for prism border + shadow accent
  textColor?: string; // optional override for text
  icon: string; // icon url or /icons/*.webp
};

export const SKILLS: Skill[] = [
  {
    name: "React",
    color: "#61DAFB",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },

  // FIX: was #FFFFFF so border looked invisible
  {
    name: "NextJS",
    color: "#111827", // visible accent for the prism border
    textColor: "#0B0B10",
    icon: "https://cdn.simpleicons.org/nextdotjs/000000",
  },

  {
    name: "TypeScript",
    color: "#3178C6",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    name: "Flutter",
    color: "#02569B",
    icon: "https://cdn.simpleicons.org/flutter/02569B",
  },
  {
    name: "Dart",
    color: "#0175C2",
    icon: "https://cdn.simpleicons.org/dart/0175C2",
  },

  {
    name: "Roblox Luau",
    color: "#00A2FF",
    icon: "https://cdn.simpleicons.org/roblox/000000",
  },

  {
    name: "Django",
    color: "#092E20",
    icon: "https://cdn.simpleicons.org/django/092E20",
  },

  // use your local .webp
  {
    name: "Django Rest",
    color: "#A30000",
    icon: "/icons/django-rest-framework.webp",
  },

  {
    name: "Laravel",
    color: "#FF2D20",
    icon: "https://cdn.simpleicons.org/laravel/FF2D20",
  },
  {
    name: "Node.js",
    color: "#3C873A",
    icon: "https://cdn.simpleicons.org/nodedotjs/000000",
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    name: "Java",
    color: "#E76F00",
    icon: "https://cdn.simpleicons.org/openjdk/E76F00",
  },
  {
    name: "PHP",
    color: "#777BB4",
    icon: "https://cdn.simpleicons.org/php/777BB4",
  },
  {
    name: "C++",
    color: "#00599C",
    icon: "https://cdn.simpleicons.org/cplusplus/00599C",
  },

  // requested: MySQL + PostgreSQL using .webp from your /public/icons
  {
    name: "MySQL",
    color: "#4479A1",
    icon: "/icons/mysql.webp",
  },
  {
    name: "PostgreSQL",
    color: "#4169E1",
    icon: "/icons/postgresql.webp",
  },

  {
    name: "MongoDB",
    color: "#47A248",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    name: "SQLite",
    color: "#003B57",
    icon: "https://cdn.simpleicons.org/sqlite/003B57",
  },

  {
    name: "Shopee API",
    color: "#FF5722",
    icon: "/icons/shopee-api.webp",
    textColor: "#000000",
  },
  // use your local .webp
  {
    name: "Amazon Redshift",
    color: "#8C4FFF",
    icon: "/icons/aws-redshift.webp",
  },
  {
    name: "AWS Glue",
    color: "#232F3E",
    icon: "/icons/aws-glue.webp",
  },

  // optional, but you have it in your folder
  {
    name: "Hostinger",
    color: "#673DE6",
    icon: "/icons/hostinger_logo.webp",
  },

  {
    name: "Git",
    color: "#F05032",
    icon: "https://cdn.simpleicons.org/git/F05032",
  },
  {
    name: "Linux",
    color: "#FCC624",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
  },
  {
    name: "Figma",
    color: "#A259FF",
    icon: "https://cdn.simpleicons.org/figma/A259FF",
  },

  // FIX: was #FFFFFF so border looked invisible
  {
    name: "Unity",
    color: "#111827", // visible accent for prism border
    textColor: "#0B0B10",
    icon: "https://cdn.simpleicons.org/unity/000000",
  },

  // use your local .webp
  {
    name: "Power BI",
    color: "#F2C811",
    icon: "/icons/power-bi.webp",
  },

  // use your local .webp
  {
    name: "Firebase",
    color: "#FFCA28",
    icon: "/icons/firebase.webp",
  },

  // requested: Vue.js using .webp
  {
    name: "Vue.js",
    color: "#42B883",
    icon: "/icons/vue.webp",
  },

  // requested: Vercel using .webp
  {
    name: "Vercel",
    color: "#111827",
    textColor: "#0B0B10",
    icon: "/icons/vercel.webp",
  },

  {
    name: "Digital Ocean",
    color: "#0080FF",
    icon: "/icons/digital-ocean.webp",
    textColor: "#000000",
  },

  {
    name: "Tailwind CSS",
    color: "#38BDF8",
    icon: "/icons/tailwindcss.webp",  
    textColor: "#000000",
  },

  {
    name: "Material UI",
    color: "#007FFF",
    icon: "/icons/material-ui.webp",
    textColor: "#000000",
  }
];
