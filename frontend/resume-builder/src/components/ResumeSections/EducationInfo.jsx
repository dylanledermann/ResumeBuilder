import React from 'react'

const EducationInfo = ({ degree, institution, duration }) => {
  return (
    <div className="flex items-center gap-3">
        <h3 className={`text-[15px] font-semibold text-gray-900`}>{institution}</h3>
        <p className="text-sm text-gray-700 font-medium">{degree}</p>
        <p className="text-xs text-gray-500 font-medium italic mt-0.5">{duration}</p>
    </div>
  )
}

export default EducationInfo
