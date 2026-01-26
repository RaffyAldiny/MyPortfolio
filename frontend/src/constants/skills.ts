export type Skill = { 
  name: string; 
  color: string; 
  textColor?: string; 
  icon?: string 
};

export const SKILLS: Skill[] = [
  { name: "React", color: "#61DAFB" },
  { name: "NextJS", color: "#111111", textColor: "#0B0B10" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Flutter", color: "#02569B", textColor: "#0B0B10" },
  { name: "Dart", color: "#0175C2" },
  { name: "Django", color: "#092E20", textColor: "#0B0B10" },
  { name: "DRF", color: "#A30000" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "Node.js", color: "#3C873A" },
  { name: "Python", color: "#3776AB" },
  { name: "Java", color: "#E76F00" },
  { name: "PHP", color: "#777BB4" },
  { name: "C++", color: "#00599C" },
  { name: "MongoDB", color: "#47A248" },
  { name: "SQLite", color: "#003B57" },
  { name: "Git", color: "#F05032" },
  { name: "Linux", color: "#FCC624" },
  { name: "Figma", color: "#A259FF" },
  { name: "Photoshop", color: "#31A8FF" },
  { name: "Illustrator", color: "#FF9A00" },
  { name: "Unity", color: "#222222", textColor: "#0B0B10" },
  { name: "Power BI", color: "#F2C811" },
  { name: "Firebase", color: "#FFCA28" },
];