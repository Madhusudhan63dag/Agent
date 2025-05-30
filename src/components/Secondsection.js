import React from 'react'
import one from '../assets/images/one.jpg'
import two from '../assets/images/two.webp'  
import three from '../assets/images/three.jpg'
import four from '../assets/images/four.jpg'

const Secondsection = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Common Types of Pain We Help Relieve
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Large Image */}
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group">
              <img 
                src={one} 
                alt="Joint Pain Relief" 
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">Neck Pain</h3>
                  <p className="text-lg">Instant relief for neck strain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Small Images Grid */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {/* Muscle Pain */}
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group">
                <img 
                  src={two} 
                  alt="Muscle Pain Relief" 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">Wrist Pain</h3>
                    <p className="text-sm">Quick relief for Wrist joint</p>
                  </div>
                </div>
              </div>

              {/* Back Pain */}
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group">
                <img 
                  src={three} 
                  alt="Back Pain Relief" 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">Knee Pain</h3>
                    <p className="text-sm">Natural relief for chronic knee pain</p>
                  </div>
                </div>
              </div>

              {/* Neck Pain */}
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative group">
                <img 
                  src={four} 
                  alt="Neck Pain Relief" 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">Knee Pain</h3>
                    <p className="text-sm">Instant relief for Knee strain</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-blue-600 flex items-center justify-center text-white p-6">
                <div className="text-center">
                  <p className="font-bold text-xl mb-2">And Many More</p>
                  <p className="text-sm opacity-90">Discover natural relief for various types of body pain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Secondsection