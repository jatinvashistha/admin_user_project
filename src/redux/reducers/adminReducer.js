import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    

    getAllUsersRequest: state => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRoleRequest: state => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     updateUserDetailRequest: state => {
      state.loading = true;
    },
    updateUserDetailSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     updateUserImageRequest: state => {
      state.loading = true;
    },
    updateUserImageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserImageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     updateUserNameRequest: state => {
      state.loading = true;
    },
    updateUserNameSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserNameFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: state => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
