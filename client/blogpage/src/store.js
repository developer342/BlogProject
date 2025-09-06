import { configureStore } from '@reduxjs/toolkit'

const dummyReducer = (state = {}, action) => state;


export default configureStore({
  reducer: {
    dummy: dummyReducer,
  }
})