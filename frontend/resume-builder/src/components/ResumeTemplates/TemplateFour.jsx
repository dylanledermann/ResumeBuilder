import React, { useEffect, useRef, useState } from 'react';
import {
    LuMapPinHouse,
    LuMail,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from '../ResumeSections/ContactInfo';
import { formatYearMonth } from '../../utils/helper';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from '../ResumeSections/CertificationInfo';

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / baseWidth);
    }, [containerWidth]);

    return (
        <div
            ref={resumeRef}
            className="p-8 bg-white font-serif"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Header */}
            <div className="text-center border-b pb-4 mb-6">
                <h1 className="text-3xl font-bold" style={{ backgroundColor: themeColors[1] }}>{resumeData.profileInfo.fullName}</h1>
                <p className="text-sm">{resumeData.profileInfo.designation}</p>
                <div className="text-xs mt-2 space-x-4">
                    <span>{resumeData.contactInfo.email}</span>
                    <span>{resumeData.contactInfo.phone}</span>
                    {resumeData.contactInfo.linkedin && <span>{resumeData.contactInfo.linkedin}</span>}
                </div>
            </div>

            {/* Professional Summary */}
            <Section title="Professional Summary" color={themeColors[3]}>
                <p className="text-sm leading-relaxed">
                    {resumeData.profileInfo.summary}
                </p>
            </Section>

            {/* Work Experience */}
            <Section title="Work Experience" color={themeColors[3]}>
                {resumeData.workExperience.map((data, index) => (
                    <WorkExperience
                        key={`work_${index}`}
                        company={data.company}
                        role={data.role}
                        duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                        description={data.description}
                        durationColor={themeColors[4]}
                    />
                ))}
            </Section>

            {/* Education */}
            <Section title="Education" color={themeColors[3]}>
                {resumeData.education.map((data, index) => (
                    <EducationInfo
                        key={`edu_${index}`}
                        degree={data.degree}
                        institution={data.institution}
                        duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                    />
                ))}
            </Section>

            {/* Skills */}
            <Section title="Skills" color={themeColors[3]}>
                <SkillSection
                    skills={resumeData.skills}
                    accentColor={themeColors[3]}
                    bgColor={themeColors[2]}
                />
            </Section>

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
                <Section title="Certifications" color={themeColors[3]}>
                    {resumeData.certifications.map((cert, index) => (
                        <CertificationInfo
                            key={`cert_${index}`}
                            title={cert.title}
                            issuer={cert.issuer}
                            year={cert.year}
                            bgColor={themeColors[2]}
                        />
                    ))}
                </Section>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
                <Section title="Projects" color={themeColors[3]}>
                    {resumeData.projects.map((project, index) => (
                        <ProjectInfo
                            key={`project_${index}`}
                            title={project.title}
                            description={project.description}
                            githubLink={project.github}
                            liveDemoUrl={project.liveDemo}
                            bgColor={themeColors[2]}
                        />
                    ))}
                </Section>
            )}

            {/* Languages */}
            {resumeData.languages.length > 0 && (
                <Section title="Languages" color={themeColors[3]}>
                    <LanguageSection
                        languages={resumeData.languages}
                        accentColor={themeColors[3]}
                        bgColor={themeColors[2]}
                    />
                </Section>
            )}

            {/* Interests */}
            {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
                <Section title="Interests" color={themeColors[3]}>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {resumeData.interests.map((interest, index) => (
                            <div
                                key={`interest_${index}`}
                                className="text-xs font-medium py-1 px-3 rounded-full"
                                style={{ backgroundColor: themeColors[2] }}
                            >
                                {interest}
                            </div>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
};

// A minimalist reusable section title wrapper
const Section = ({ title, children, color }) => (
    <div className="mb-5">
        <h3 className="text-md font-bold border-b pb-1 mb-2" style={{ color }}>{title}</h3>
        {children}
    </div>
);


export default TemplateFour
