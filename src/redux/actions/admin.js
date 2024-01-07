import { server } from '../Store';
import axios from 'axios';

  export const getAllUsers = () => async dispatch => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: 'getAllUsersRequest' });
  
      const { data } = await axios.get(`${server}/admin/users`, config);
  
      dispatch({ type: 'getAllUsersSuccess', payload: data.users });
    } catch (error) {
      dispatch({
        type: 'getAllUsersFail',
        payload: error.response.data.message,
      });
    }
  };
  export const updateUserRole = id => async dispatch => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: 'updateUserRoleRequest' });
  
      const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);
   console.log(data, "<- the data is")
      dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'updateUserRoleFail',
        payload: error.response.data.message,
      });
    }
};

 
export const updateUserDetail = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateUserDetailRequest' });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const response = await axios.put(
      `${server}/admin/userUpdate/${id}`,
      formData,
      config
    );

    console.log(response.data, "<- the data is");

    dispatch({ type: 'updateUserDetailSuccess', payload: response.data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserDetailFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserImage = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateUserImageRequest' });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const response = await axios.put(
      `${server}/admin/updateuserimage/${id}`,
      formData,
      config
    );

    console.log(response.data, "<- the data is");

    dispatch({ type: 'updateUserImageSuccess', payload: response.data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserImageFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserName = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateUserNameRequest' });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    const response = await axios.put(
      `${server}/admin/updateusername/${id}`,
      formData,
      config
    );

    console.log(response.data, "<- the data is");

    dispatch({ type: 'updateUserNameSuccess', payload: response.data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserNameFail',
      payload: error.response.data.message,
    });
  }
};


  
export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

 