import React from 'react'

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden curser-pointer
        ${isSelected ? "border-purple-500 border-2" : ""}`}
        onClick = {onSelect}>
            {thumbnailImg ? (
                <img src={thumbnailImg} alt="Template" className='w-[100%l] rounded' />
            ): (
                <div></div>
            )}
        </div>
  )
}

export default TemplateCard
