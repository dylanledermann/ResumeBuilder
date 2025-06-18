import TEMPLATE_ONE_IMG from '../assets/template-one.png';
import TEMPLATE_TWO_IMG from '../assets/template-two.png';
import TEMPLATE_THREE_IMG from '../assets/template-three.png';

export const resumeTemplates = [
    {
        id:'01',
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: 'themeOne'
    },
    {
        id:'02',
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPaletteCode: 'themeTwo'
    },
    {
        id:'03',
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPaletteCode: 'themeThree'
    },
]

export const themeColorPalette = {
    themeOne: [
        ["#EBFDFF", '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'],

        ["#E9FBF8", '#B4EFE7', '#93E2DA', '#2AC9A0', '#3D4C5A'],
        ["#F5F4FF", '#E0DBFF', '#C9C2F8', '#8579D1', '#4B4B5C'],
        ["#F0F4FF", '#D6F0FF', '#AFDEFF', '#3399FF', '#445361'],
        ["#FFF5F7", '#FFE0EC', '#FAC6D4', '#F6729C', '#5A5A5A'],
        ["#FFF5F7", '#E4E7EB', '#CBD5E0', '#7F9CF5', '#2D3748'],

        ["#F4FFFD", '#D3FDF2', '#B0E9D4', '#34C79D', '#384C48'],
        ["#FFF7F0", '#FFE6D9', '#FFD2BA', '#FF9561', '#4C4743'],
        ["#F9FCFF", '#E3F0F9', '#C0DDEE', '#6CA6CF', '#46545E'],
        ["#FFFDF6", '#FFF4D7', '#FFE7A0', '#FFD000', '#57534E'],
        ["#EFFCFF", '#C8F0FF', '#99E0FF', '#007BA7', '#2B3A42'],

        ["#F7F7F7", '#E4E4E4', '#CFCFCF', '#4A4A4A', '#222222'],
        ["#E3F2FD", '#90CAF9', '#a8d2f4', '#1E88E5', '#0D47A1'],
    ],
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "John Doe",
        designation: "Senior Software Engineer",
        summary:
            "Passionate and results-driven developer"
    },
    contactInfo: {
        email: "john.doe@example.com",
        phone: "+1234567890",
        location: "#12 Street, City, Country",
        linkedin: "https://linkedin.com/johndoe",
        github: "https://github.com/johndoe",
        website: "https://johndoe",
    },
    workExperience: [
        {
            company: "TechCorp Solutions",
            role: "Software Engineer",
            startDate: "2021-06",
            endDate: "2023-09",
            description: "Developed scalable backend services using Node.js and PostgreSQL."
        },
        {
            company: "InnovateX",
            role: "Frontend Developer",
            startDate: "2019-01",
            endDate: "2021-05",
            description: "Designed and implemented responsive UIs with React and Redux."
        }
    ],
    education: [
        {
            institution: "State University",
            degree: "Bachelor of Science in Computer Science",
            startDate: "2015-08",
            endDate: "2019-05",
        }
    ],
    skills: [
        {
            name: "JavaScript",
            progress: 95
        },
        {
            name: "Python",
            progress: 90
        },
        {
            name: "Docker",
            progress: 80
        }
    ],
    projects: [
        {
            name: "Task Tracker App",
            description: "Built a full-stack task management app using MERN stack.",
            github: "https://github.com/project",
            liveDemo: "https://user.github.io/project",
        }
    ],
    certifications: [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            year: "2022",
        }
    ],
    languages: [
        {
            name: "English",
            progress: 95
        },
        {
            name: "Spanish",
            progress: 90
        },
    ],
    interests: ["Reading", "Swimming"],
}