import React, { useState } from 'react';
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dh8r6evzr' // replace with your actual Cloudinary cloud name
  }
});

const HotelRoomForm = () => {
  const [formData, setFormData] = useState({
    hotel: '6874877d4abf70bee6663965',
    roomType: '',
    imageUrls: [],
    pricePerNight: '',
    amenities: []
  });

  const [uploading, setUploading] = useState(false);

  const amenitiesList = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updated = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter(a => a !== value);
      return { ...prev, amenities: updated };
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'reverie'); // your preset name
          data.append('folder', 'reverie-uploads');

          const res = await axios.post(
            'https://api.cloudinary.com/v1_1/dh8r6evzr/image/upload',
            data
          );

          return res.data.secure_url;
        })
      );

      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls]
      }));
    } catch (err) {
      console.error('Cloudinary Upload Error:', err.response?.data || err);
      alert('Image upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      pricePerNight: Number(formData.pricePerNight)
    };

    console.log('Submitting Room Data:', payload);

    try {
      await axios.post('${import.meta.env.VITE_SERVER_URL}/api/rooms', payload);
      alert('Room saved successfully!');

      setFormData({
        hotel: '6874877d4abf70bee6663965',
        roomType: '',
        imageUrls: [],
        pricePerNight: '',
        amenities: []
      });
    } catch (err) {
      console.error('Error saving room:', err.response?.data || err.message || err);
      alert('Failed to save room');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Room Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Room Type */}
        <div>
          <label className="block text-gray-600 font-medium">Room Type</label>
          <input
            type="text"
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            placeholder="e.g. Double Room"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Room Images</label>
          <label className="flex flex-col items-center justify-center border border-dashed border-indigo-300 rounded-md p-4 cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition">
            <span className="text-indigo-600 font-medium">Click to upload room images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}

          {/* Optimized Cloudinary previews */}
          {formData.imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {formData.imageUrls.map((url, idx) => {
                const publicId = url
                  .split('/')
                  .slice(-2)
                  .join('/')
                  .replace(/\.[^/.]+$/, ''); // remove extension

                const img = cld.image(publicId).resize(fill().width(300).height(150));

                return (
                  <AdvancedImage
                    key={idx}
                    cldImg={img}
                    alt={`Room Preview ${idx + 1}`}
                    className="w-full h-24 object-cover rounded shadow-sm"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 font-medium">Price Per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleInputChange}
            placeholder="e.g. 280"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Amenities</label>
          <div className="flex gap-4 flex-wrap">
            {amenitiesList.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  value={item}
                  checked={formData.amenities.includes(item)}
                  onChange={handleAmenityChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded mt-4"
        >
          Save Room
        </button>
      </form>
    </div>
  );
};

export default HotelRoomForm;
