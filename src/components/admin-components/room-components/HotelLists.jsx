import React, { useEffect, useState } from 'react';
import { FaExpand } from 'react-icons/fa';
import { adminApi } from '../../../api/adminApi';
import { toast } from 'react-hot-toast';

function HotelLists() {
  const [hotels, setHotels] = useState([]);
  const [popup, setPopup] = useState(false);
  const [singleHotel, setSingleHotel] = useState();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    adminApi.get('/get-all-hotelData').then((response) => {
      setHotels(response.data.hotelData);
    });
  }, []);

  useEffect(() => {}, [hotels]);

  const handleSingleData = (hotelID) => {
    const Data = hotels.filter((hotel) => {
      return hotelID == hotel._id;
    });
    setSingleHotel(Data[0]);
    setPopup(true);
  };

  const handleStatus = (status, hotelID) => {
    if (!showToast) {
      setShowToast(true);

      const confirmChangeStatus = async () => {
        try {
          await adminApi.put('/change-hotel-status', { hotelID, status }).then((response) => {
            setHotels(response.data.hotelData);
            toast.success(response.data.message);
            // toast.success(response.data);
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };

      toast.loading((t) => (
        <div className='flex flex-col text-center justify-center'>
          <p
            className={`${
              status == 'Active'
                ? 'text-green-700 m-2 font-sans font-semibold'
                : 'text-red-700 m-2 font-sans font-semibold'
            } `}
          >
            Are you sure you want {status} this Hotel ?
          </p>

          <div className=' flex justify-end  gap-4'>
            <button
              className='text-red-900 font-sans hover:underline font-normal'
              onClick={() => {
                setShowToast(false);

                toast.dismiss(t.id);
              }}
            >
              No
            </button>
            <button
              className='text-blue-900 font-sans hover:underline font-normal'
              onClick={() => {
                toast.dismiss(t.id);
                setShowToast(false);
                confirmChangeStatus();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className='w-full h-auto overflow-auto text-black'>
      {hotels &&
        hotels?.map((hotel, index) => (
          <div
            key={index}
            className='flex flex-row justify-between items-center p-4 bg-gray-200 mx-4 my-2 border hover:border-gray-500 hover:shadow-md duration-300'
          >
            <div className=' w-1/6'>{hotel?.hotelName}</div>
            <div className=' w-1/6'>
              {hotel?.city}, {hotel?.state}
            </div>
            <div className=' w-1/6'>{hotel?.email}</div>
            <div className=' w-1/6'>{hotel?.phoneNumber}</div>
            <div>
              {hotel.status == 'Block' && (
                <button
                  className=' w-1/6 text-green-700 hover:underline'
                  onClick={() => handleStatus('Active', hotel._id)}
                >
                  Activate
                </button>
              )}
              {hotel.status == 'Active' && (
                <button
                  className=' w-1/6 text-red-700 hover:underline'
                  onClick={() => handleStatus('Block', hotel._id)}
                >
                  Block
                </button>
              )}
              {hotel && ['Rejected', 'Pending'].includes(hotel.status) && (
                <p className=' w-1/6 text-blue-700 '>{hotel?.status}</p>
              )}
            </div>
            <div onClick={() => handleSingleData(hotel._id)}>
              <FaExpand />
            </div>
          </div>
        ))}
      <div>
        {popup && (
          <div className='bg-gray-800 w-screen h-auto fixed inset-0  bg-opacity-50  flex justify-center z-50 '>
            <div className=' font-bold center-div overflow-y-scroll max-h-screen bg-white  rounded-lg p-8 max-w-2xl mx-4 h-fit'>
              <div className='flex flex-col sm:flex-row justify-between mb-8'>
                <h2 className='text-2xl font-bold mb-2 sm:mb-0'>{singleHotel?.hotelName}</h2>
                <p className='text-gray-600'>{singleHotel?.status}</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                {singleHotel?.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} className='w-full h-auto rounded-lg shadow-md' />
                ))}
              </div>
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-2'>Contact Information</h3>
                <p className='text-gray-600'>Email: {singleHotel?.email}</p>
                <p className='text-gray-600'>Phone: {singleHotel?.phoneNumber}</p>
                <p className='text-gray-600'>
                  {singleHotel?.place}, {singleHotel?.city}, {singleHotel?.state} - {singleHotel?.pincode}
                </p>
              </div>
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-2'>Amenities</h3>
                <ul className='list-disc list-inside'>
                  {singleHotel?.amnities?.map((amenity) => (
                    <li key={amenity} className='text-gray-600'>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-2'>Rooms and Pool</h3>
                <p className='text-gray-600'>Number of Rooms: {singleHotel?.rooms}</p>
                <p className='text-gray-600'>Number of Pools: {singleHotel?.pool}</p>
                <p className='text-gray-600'>Number of Allowed Guests: {singleHotel?.allowedGuests}</p>
              </div>
              <div className='mb-8'>
                <h3 className='text-xl font-bold mb-2'>Rules</h3>
                <ul className='list-disc list-inside'>
                  {singleHotel?.rules?.map((rule) => (
                    <li key={rule} className='text-gray-600'>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-bold mb-2'>Description</h3>
                <p className='text-gray-600'>{singleHotel?.description}</p>
              </div>
              <div className=' flex   items-center justify-center  h-24 py-2 px-4 mt-6 '>
                <button
                  className='text-white bg-blue-700 hover:bg-blue-900 w-20 p-2  hover:shadow-lg hover:text-gray-100 rounded-md '
                  onClick={() => setPopup(false)}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelLists;
