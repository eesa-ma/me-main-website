import { useState, useRef } from 'react'

const sections = ['All Photos', 'Photo Gallery', 'Testimonials', 'Meet Our Team', 'ME Coaches', 'Newsletter']

function GalleryGrid() {
  const [activeSection, setActiveSection] = useState('All Photos')
  const [gallery, setGallery] = useState({
    'All Photos': [],
    'Photo Gallery': [],
    'Testimonials': [],
    'Meet Our Team': [],
    'ME Coaches': [],
    'Newsletter': [],
  })
  const fileInputRef = useRef(null)

  const currentImages = gallery[activeSection]
  const hasSelected = currentImages.some(img => img.selected)

  const handleUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      selected: false,
    }))
    setGallery(prev => ({
      ...prev,
      [activeSection]: [...prev[activeSection], ...newImages],
    }))
    e.target.value = null
  }

  const toggleSelect = (id) => {
    setGallery(prev => ({
      ...prev,
      [activeSection]: prev[activeSection].map(img =>
        img.id === id ? { ...img, selected: !img.selected } : img
      ),
    }))
  }

  const handleDelete = () => {
    setGallery(prev => ({
      ...prev,
      [activeSection]: prev[activeSection].filter(img => !img.selected),
    }))
  }

  const selectAll = () => {
    setGallery(prev => ({
      ...prev,
      [activeSection]: prev[activeSection].map(img => ({ ...img, selected: true })),
    }))
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">


      <div className="flex gap-2 flex-wrap">
        {sections.map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border-none cursor-pointer transition-colors
              ${activeSection === section
                ? 'bg-[#c0623a] text-white'
                : 'bg-[#f0ede8] text-[#2a120a] hover:bg-[#e0d8d0]'}`}
          >
            {section}
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full
              ${activeSection === section
                ? 'bg-white/30 text-white'
                : 'bg-[#d9cfc9] text-[#2a120a]'}`}>
              {gallery[section].length}
            </span>
          </button>
        ))}
      </div>

     
      {currentImages.length > 0 && (
        <div className="flex items-center gap-3">
          {!hasSelected && (
            <button
              onClick={selectAll}
              className="text-xs text-[#c0623a] underline cursor-pointer bg-transparent border-none"
            >
              Select all
            </button>
          )}
          {hasSelected && (
            <>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold tracking-widest uppercase border-none cursor-pointer hover:bg-red-200 transition-colors"
              >
                <i className="ti ti-trash" /> Delete Selected
              </button>
              <span className="text-[11px] text-[#9a6a5a]">
                {currentImages.filter(i => i.selected).length} selected
              </span>
            </>
          )}
        </div>
      )}

   
      {currentImages.length === 0 ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[#e0d8d0] rounded-xl text-[#c4bab4] cursor-pointer hover:border-[#c0623a] hover:text-[#c0623a] transition-colors"
        >
          <i className="ti ti-cloud-upload text-4xl mb-2" />
          <p className="text-sm font-medium">Click to upload photos</p>
          <p className="text-xs mt-1">to {activeSection}</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {currentImages.map(img => (
            <div
              key={img.id}
              onClick={() => toggleSelect(img.id)}
              className={`relative rounded-xl overflow-hidden h-44 cursor-pointer transition-all
                ${img.selected ? 'ring-2 ring-[#c0623a]' : 'hover:opacity-90'}`}
            >
              <img
                src={img.src}
                alt="gallery"
                className="w-full h-full object-cover block"
              />
              {img.selected && (
                <div className="absolute inset-0 bg-[#c0623a]/30 flex items-start justify-end p-2">
                  <div className="w-6 h-6 rounded-full bg-[#c0623a] flex items-center justify-center">
                    <i className="ti ti-check text-white text-xs" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      
      <div className="flex justify-center pt-2 border-t border-[#f0ede8]">
        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#c0623a] text-white text-xs font-semibold tracking-widest uppercase border-none cursor-pointer hover:bg-[#a84f2c] transition-colors"
        >
          <i className="ti ti-upload" /> Upload Photos to {activeSection}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

    </div>
  )
}

export default GalleryGrid