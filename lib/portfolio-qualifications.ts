export interface Qualification {
  category: string;
  title: string;
  institution?: string;
  duration?: string;
  description?: string;
  details?: {
    challenge?: string;
    solution?: string;
    result?: string;
    academic?: {
      semesters?: { sem: number; percent: string }[];
      cgpa?: string;
      division?: string;
    };
  };
  skills:string[];
} 

export const qualificationsData: Qualification[] = [
  {
    category: 'Education',
    title: 'Secondary Schooling',
    institution: 'Honey Modern High School',
    duration: '2018 - 2019',
    description: 'Completed with distinction in Science and Mathematics. Scored 87.6% aggregate',
    skills: ["Mathematics basics", "Science fundamentals", "Analytical thinking", "Time management"]
  },
  {
    category: 'Education',
    title: 'Senior Secondary Schooling',
    institution: 'Hindu Sr. Sec. School',
    duration: '2020 - 2021',
    description: 'Science Stream with 80.2% aggregate',
    skills: ["Physics", "Chemistry", "Mathematics", "Basic programming", "Problem-solving"]
  },
  {
    category: 'Education',
    title: 'B.Tech in Computer Science & Engineering',
    institution: "Tula's Institute, Dehradun (Affiliated to VMSB UTU)",
    duration: '2022 - 2026',
    description: 'Graduated with First Division with Distinction • Grand CGPA: 8.14 (79.48%)',
    details: {
      challenge: 'Balancing rigorous engineering coursework and advanced CS concepts with real-world project development.',
      solution: 'Mastered core CS fundamentals, algorithms, system engineering, and full-stack software development.',
      result: 'Graduated with First Division with Distinction (8.14 CGPA) across 8 semesters with multiple shipped projects.',
      academic: {
        semesters: [
          { sem: 1, percent: '79.58%' },
          { sem: 2, percent: '78.63%' },
          { sem: 3, percent: '83.26%' },
          { sem: 4, percent: '74.56%' },
          { sem: 5, percent: '77.16%' },
          { sem: 6, percent: '77.56%' },
          { sem: 7, percent: '84.63%' },
          { sem: 8, percent: '80.11%' },
        ],
        cgpa: '8.14',
        division: 'First Division with Distinction',
      },
    },
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks", "Operating Systems", "Python", "Java", "Software Engineering"]
  },
  {
    category: 'Certifications',
    title: 'Web Development Internship',
    institution: 'Internshala',
    duration: 'Aug-Oct 2023',
    description:"Completed a web dev internship via Internshala, working with HTML, CSS, JS, React, and Node.js. Scored 67% for practical project contributions.",
    details: {
      challenge: 'Required expertise in modern web technologies and responsive design principles.',
      solution: 'Mastered React, Node.js, and database management through hands-on projects.',
      result: 'Built 12+ responsive web applications serving 10,000+ users.',
    },
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Team collaboration"]
  },
  {
    category: 'Certifications',
    title: 'App Development',
    institution: 'Flutter & Dart Course - Udemy',
    duration: 'Apr-Jun 2024',
    description:"Completed a Flutter & Dart course on Udemy, learning to build cross-platform mobile apps with responsive UI, state management, and API integration.",
       details: {
      challenge: 'Needed to master cross-platform mobile development for rapid deployment.',
      solution: 'Completed comprehensive Flutter certification covering UI/UX, state management, and API integration.',
      result: 'Successfully deployed 5 production apps with 50% reduced development time.',
    },
    skills: ["Flutter", "Dart", "Mobile UI design", "State management", "REST APIs"]
  },
  {
    category: 'Certifications',
    title: "React Course",
    institution: 'Udemy',
    duration: 'September 2025',
 description:"Pursuing an advanced React course covering components, hooks, state, and SPA architecture to build scalable, responsive web apps.",
    details: {
      challenge: 'Mastering advanced React concepts and SPA architecture for scalable web apps.',
      solution: 'Completed an advanced React course focused on hooks, component architecture, and performance optimization.',
      result: 'Built multiple scalable, responsive SPAs with improved maintainability and speed.',
    },
    skills: ["Advanced React", "Hooks", "Component architecture", "SPA development", "Performance optimization"]
  },
    {
    category: 'Certifications',
    title: "Big Data & Cloud Computing",
    institution: 'Campus Shutra',
    duration: 'November 2025',
        description:"Completed a Big Data & Cloud Computing course at Campus Shutra, learning distributed data processing, cloud infrastructure, and scalable analytics solutions.",
    details: {
      challenge: 'Handling massive datasets and deploying scalable analytics in the cloud.',
      solution: 'Mastered Hadoop, Spark, and AWS cloud services for distributed computing and data engineering.',
      result: 'Built and deployed scalable big data pipelines and cloud-based analytics platforms.',
    },
    skills: ["Big Data", "Cloud Computing", "Hadoop", "Spark", "AWS", "Distributed Systems", "Data Engineering"]
  },
];

