export type SkillGroup = "frontend" | "backend" | "data" | "tools";

export type Skill = {
  name: string;
  color: string;
  icon: string;
  textColor?: string;
  groups: SkillGroup[];
};

export const SKILLS: ReadonlyArray<Skill> = [
  {
    name: "React",
    color: "#61DAFB",
    icon: "/icons/skills/react.svg",
    groups: ["frontend"],
  },
  {
    name: "Next.js",
    color: "#111827",
    textColor: "#0B0B10",
    icon: "/icons/skills/nextjs.svg",
    groups: ["frontend"],
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: "/icons/skills/typescript.svg",
    groups: ["frontend"],
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: "/icons/skills/javascript.svg",
    groups: ["frontend"],
  },
  {
    name: "Flutter",
    color: "#02569B",
    icon: "/icons/skills/flutter.svg",
    groups: ["frontend"],
  },
  {
    name: "Dart",
    color: "#0175C2",
    icon: "/icons/skills/dart.svg",
    groups: ["frontend"],
  },
  {
    name: "Roblox Luau",
    color: "#00A2FF",
    icon: "/icons/skills/roblox.svg",
    groups: ["backend"],
  },
  {
    name: "Django",
    color: "#092E20",
    icon: "/icons/skills/django.svg",
    groups: ["backend"],
  },
  {
    name: "Django REST",
    color: "#A30000",
    icon: "/icons/django-rest-framework.webp",
    groups: ["backend"],
  },
  {
    name: "Laravel",
    color: "#FF2D20",
    icon: "/icons/skills/laravel.svg",
    groups: ["backend"],
  },
  {
    name: "Node.js",
    color: "#3C873A",
    icon: "/icons/skills/nodejs.svg",
    groups: ["backend"],
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: "/icons/skills/python.svg",
    groups: ["backend"],
  },
  {
    name: "Java",
    color: "#E76F00",
    icon: "/icons/skills/java.svg",
    groups: ["backend"],
  },
  {
    name: "PHP",
    color: "#777BB4",
    icon: "/icons/skills/php.svg",
    groups: ["backend"],
  },
  {
    name: "C++",
    color: "#00599C",
    icon: "/icons/skills/cplusplus.svg",
    groups: ["backend"],
  },
  {
    name: "MySQL",
    color: "#4479A1",
    icon: "/icons/mysql.webp",
    groups: ["data"],
  },
  {
    name: "PostgreSQL",
    color: "#4169E1",
    icon: "/icons/postgresql.webp",
    groups: ["data"],
  },
  {
    name: "MongoDB",
    color: "#47A248",
    icon: "/icons/skills/mongodb.svg",
    groups: ["data"],
  },
  {
    name: "SQLite",
    color: "#003B57",
    icon: "/icons/skills/sqlite.svg",
    groups: ["data"],
  },
  {
    name: "Shopee API",
    color: "#FF5722",
    icon: "/icons/shopee-api.webp",
    textColor: "#000000",
    groups: ["backend"],
  },
  {
    name: "Amazon Redshift",
    color: "#8C4FFF",
    icon: "/icons/aws-redshift.webp",
    groups: ["data"],
  },
  {
    name: "AWS Glue",
    color: "#232F3E",
    icon: "/icons/aws-glue.webp",
    groups: ["data"],
  },
  {
    name: "Hostinger",
    color: "#673DE6",
    icon: "/icons/hostinger_logo.webp",
    groups: ["tools"],
  },
  {
    name: "Git",
    color: "#F05032",
    icon: "/icons/skills/git.svg",
    groups: ["tools"],
  },
  {
    name: "Linux",
    color: "#FCC624",
    icon: "/icons/skills/linux.svg",
    groups: ["tools"],
  },
  {
    name: "Figma",
    color: "#A259FF",
    icon: "/icons/skills/figma.svg",
    groups: ["tools"],
  },
  {
    name: "Unity",
    color: "#111827",
    textColor: "#0B0B10",
    icon: "/icons/skills/unity.svg",
    groups: ["tools"],
  },
  {
    name: "Power BI",
    color: "#F2C811",
    icon: "/icons/power-bi.webp",
    groups: ["data"],
  },
  {
    name: "Firebase",
    color: "#FFCA28",
    icon: "/icons/firebase.webp",
    groups: ["tools"],
  },
  {
    name: "Vue.js",
    color: "#42B883",
    icon: "/icons/vue.webp",
    groups: ["frontend"],
  },
  {
    name: "Vercel",
    color: "#111827",
    textColor: "#0B0B10",
    icon: "/icons/vercel.webp",
    groups: ["tools"],
  },
  {
    name: "Digital Ocean",
    color: "#0080FF",
    icon: "/icons/digital-ocean.webp",
    textColor: "#000000",
    groups: ["tools"],
  },
  {
    name: "Tailwind CSS",
    color: "#38BDF8",
    icon: "/icons/tailwindcss.webp",
    textColor: "#000000",
    groups: ["frontend"],
  },
  {
    name: "Material UI",
    color: "#007FFF",
    icon: "/icons/material-ui.webp",
    textColor: "#000000",
    groups: ["frontend"],
  },
];
