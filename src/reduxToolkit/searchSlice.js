import { createSlice } from '@reduxjs/toolkit';

const date = new Date();
const defaultDate =
  date.toLocaleString('default', { weekday: 'long' }) +
  ' ' +
  date.getDate() +
  ' ' +
  date.toLocaleString('default', { month: 'long' });

const tomorrow = new Date(date); // Create a new date object with current date
tomorrow.setDate(date.getDate() + 1);
const tmr =
  tomorrow.toLocaleString('default', { weekday: 'long' }) +
  ' ' +
  tomorrow.getDate() +
  ' ' +
  tomorrow.toLocaleString('default', { month: 'long' });

const initialState = {
  checkInDate: defaultDate,
  checkOutDate: tmr,
  location: null,
  roomCounts: 1,
  guestCounts: [1],
  hotelData: [],
  sort: null,
  amnities: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCheckinDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setCheckoutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setViewCalender: (state, action) => {
      state.viewCalendar = action.payload;
    },
    addNewRoom: (state) => {
      state.roomCounts = state.roomCounts + 1;
      state.guestCounts = [...state.guestCounts, 1];
    },
    deleteRoom: (state) => {
      state.roomCounts = state.roomCounts - 1;
      state.guestCounts = state.guestCounts.slice(0, -1);
    },
    addNewGuest: (state, action) => {
      state.guestCounts[action.payload] = state.guestCounts[action.payload] + 1;
    },
    removeGuest: (state, action) => {
      state.guestCounts[action.payload] = state.guestCounts[action.payload] - 1;
    },
    setHotelData: (state, action) => {
      // state.hotelData = null;
      state.hotelData = action.payload;
    },
    sortHotelPrice: (state, action) => {
      state.sort = parseInt(action.payload);
    },
    updateAmnities: (state, action) => {
      state.amnities = action.payload;
    },
  },
});

export const {
  setCheckinDate,
  setCheckoutDate,
  setLocation,
  setViewCalender,
  addNewRoom,
  deleteRoom,
  addNewGuest,
  removeGuest,
  setHotelData,
  sortHotelPrice,
  updateAmnities,
} = searchSlice.actions;

export default searchSlice.reducer;
