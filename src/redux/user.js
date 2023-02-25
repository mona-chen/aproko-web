/* eslint-disable jsx-a11y/alt-text */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import setAuthToken from "../utils/auth";

export const registerUser = createAsyncThunk(
  "/register",
  async (formData, thunkAPI) => {
    const payload = {
      email: formData.email,
      password: formData.password,
      fname: formData.fname,
      lname: formData.lname,
      business_name: formData.business_name,
      phone: formData.phone,
    };
    try {
      const { data } = await axios.post("register", payload);
      // console.log("login", data);
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
          position: "top-right",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        toast.success(data.message, {
          theme: "colored",
          position: "top-right",
      
          
        });
        // console.log(data, 'from this point');
        return data;
        // await thunkAPI.dispatch(login(data.data.user));
        // return thunkAPI.rejectWithValue(data);
      }
      // return thunkAPI.rejectWithValue(data);
    } catch (err) {
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
        return thunkAPI.rejectWithValue(err);
      }
    }
  }
);

export const validateOtp = createAsyncThunk(
  "register/validate_registration_otp",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const { data } = await axios.post(
        "register/validate_registration_otp",
        payload
      );
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        // toast.success(data.data.message, {
        //   theme: "colored",
        // });
        await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "register/update-user-profile",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const { data } = await axios.post("/update_user", payload);
      console.log(data);
      if (data.status === "fail") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        toast.success(data.message, {
          theme: "colored",
      
          
        });
        // await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const validateSSO = createAsyncThunk(
  "login/validate_email_captured_via_login",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const { data } = await axios.post(
        "login/validate_email_captured_via_login",
        payload
      );
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        // toast.success(data.data.message, {
        //   theme: "colored",
        // });
        await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authenticateLogin = createAsyncThunk(
  "authenticate_login",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const { data } = await axios.post("authenticate_login", payload);
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
          position: "top-right",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        await thunkAPI.dispatch(login(data.data.user));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      //
      // ;
      if (err.response.data.status === "fail") {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resendEmail = createAsyncThunk(
  "register/resend_email_validation_otp",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "register/resend_email_validation_otp",
        payload
      );
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        // return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        toast.success(data.message, {
          theme: "colored",
      
          
        });
        // await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 400) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  "register/get-user",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const token = localStorage.getItem("token");
      await setAuthToken(token);
      const { data } = await axios.get("/get_user");
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        // return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        // console.log("resend otp", data);
        const business1 = data?.data?.business;
        const account_details1 = data?.data?.account_details;
        const user1 = data?.data?.user;
        await thunkAPI.dispatch(setUser(user1));
        await thunkAPI.dispatch(setBusiness(business1));
        await thunkAPI.dispatch(setAccountDetails(account_details1));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 400) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const setUserPin = createAsyncThunk(
  "set_user_pin",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("set_user_pin", payload);
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
        });
        // return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        toast.success(data.message, {
          theme: "colored",
          position: "top-right",
      
          
        });
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (formData, thunkAPI) => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const data = await axios.post("/login", payload);
      // console.log("we gere", data);
      if (data?.response?.data?.status === "fail") {
        toast.error(data?.response?.data?.message, {
          theme: "colored",
          position: "top-right",
          
        });
        return;
      }
      if (data?.data?.status !== "success") {
        if (data?.payload?.data?.action === "verify_email") {
          toast.info(data?.data?.message, {
            theme: "colored",
            position: "top-right",
            
            });
          return data?.data;
        } else
          toast.error(data?.data?.message, {
            theme: "colored",
            position: "top-right",
            
            });
        return thunkAPI.rejectWithValue(data?.data);
      }
      if (data?.data?.status === "success") {
        toast.success(data?.data?.message, {
          theme: "colored",
          position: "top-right",
      
          
        });
        await thunkAPI.dispatch(login(data?.data));
        return thunkAPI.rejectWithValue(data?.data);
      }
    } catch (err) {
      // console.log(err);
      if (
        err.response.data.status === "fail" &&
        err.response.data.message !==
          "Your email address is yet to be verified. A mail has been sent to your email address. Please check and follow the instruction in the mail to verify account."
      ) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot-password",
  async (email, thunkAPI) => {
    try {
      const { data } = await axios.post("/forgot_password", email);
      // console.log("forgot", data);
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        // toast.success(data.message, {
        //   theme: "colored",
        // });
        await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("/reset_password", payload);
      // console.log("register", data);

      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        //   toast.success(data.data.message, {
        //     theme: "colored",
        //   });
        // await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const validateUniqueEmail = createAsyncThunk(
  "register/unique_email_and_phone",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("register/unique_email_and_phone", payload);

      console.warn(data, "from unique");

      if (data?.data?.status === "success") {
        // toast.success(data.data.message, {
        //   theme: "colored",
        // });
        await thunkAPI.dispatch(login(data));
        return data?.data;
      } else if (data?.response?.data?.status !== "success") {
        toast.error(data?.response?.data?.message, {
          theme: "colored",
      
        });
        return data;
      } else if (data?.data?.status !== "success") {
        toast.error(data?.data?.message, {
          theme: "colored",
      
        });
        return data;
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const validateResetPasswordOtp = createAsyncThunk(
  "verify_reset_passwordOTP",
  async (otp, thunkAPI) => {
    try {
      const { data } = await axios.post("verify_reset_passwordOTP", otp);
      // console.log("validateOtp", data);
      if (data.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data);
      }
      if (data.status === "success") {
        toast.success(data.data.message, {
          theme: "colored",
      
          
        });
        await thunkAPI.dispatch(login(data));
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("/logout_user", payload);
      // console.log(data);
      if (data?.data?.status === "fail") {
        toast.error(data?.data?.message, {
          theme: "colored",
      
        });
        // return thunkAPI.rejectWithValue(data);
      }
      if (data?.data?.status === "success") {
        toast.success(data?.data?.message, {
          theme: "colored",
      
          
        });
        return data;
      }
    } catch (err) {
      //
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTeamMemberByInvite = createAsyncThunk(
  "logout",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `/teams/team_members_with_pending_invites/${payload}`
      );
      // console.log(data);
      if (data?.data?.status === "fail") {
        // toast.error(data?.data?.message, {
        //   theme: "colored",
        // });
        // return thunkAPI.rejectWithValue(data);
      }
      if (data?.data?.status === "success") {
        // toast.success(data?.data?.message, {
        //   theme: "colored",
        // });
        return data;
      }
    } catch (err) {
      //
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const processInviteTeamRegistration = createAsyncThunk(
  "logout",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("/teams/register", payload);

      // console.log("register", data);

      if (data?.data?.status !== "success") {
        toast.error(data.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data?.data);
      }
      if (data?.data?.status === "success") {
        toast.success(data.data.message, {
          theme: "colored",
      
          
        });
        // await thunkAPI.dispatch(login(data));
        return data;
      }
    } catch (err) {
      //
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const uploadBusinessLogo = createAsyncThunk(
  "logout",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("upload_logo", payload);

      // console.log("register", data);

      // if(data?.response?.data?.status === "fail"){
      //   toast.error(data?.response?.data?.message, {
      //     theme: "colored",
      //     icon: ({ theme, type }) => (
      //       <img src={type === "error" ? errorIcon : successIcon} />
      //     ),
      //     toastId: customErrorId,
      //   });
      //   return
      // }

      if (data?.data?.status === "fail") {
        toast.error(data?.data?.message, {
          theme: "colored",
      
        });
        return thunkAPI.rejectWithValue(data?.data);
      }
      if (data?.data?.status === "success") {
        toast.success(data.data.message, {
          theme: "colored",
        });
        // await thunkAPI.dispatch(login(data));
        return data?.data;
      }
    } catch (err) {
      //
      // ;
      if (err.response.data.status === "fail" && err.response.status !== 401) {
        toast.error(err.response.data.message, {
          theme: "colored",
          position: "top-right",
      
        });
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const user = createSlice({
  name: "user",
  initialState: {
    user: [],
    business: [],
    account_details: [],
    isAuth: false,
    loading: false,
    loadUser: false,
    loadUpdate: false,
    loadLogout: false,
    // token: JSON.parse(localStorage.getItem('token')) ,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
      state.isAuth = true;
    },
    setAccountDetails: (state, action) => {
      state.account_details = action.payload;
      state.isAuth = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [registerUser.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [getUser.pending]: (state) => {
      state.loadUser = true;
    },
    [getUser.fulfilled]: (state) => {
      state.loadUser = false;
    },
    [getUser.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loadUser = false;
      state.isAuth = false;
      state = null;
    },
    [validateOtp.pending]: (state) => {
      state.loading = true;
    },
    [validateOtp.fulfilled]: (state) => {
      state.loading = false;
    },
    [validateOtp.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [authenticateLogin.pending]: (state) => {
      state.loading = true;
    },
    [authenticateLogin.fulfilled]: (state) => {
      state.loading = false;
    },
    [authenticateLogin.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [resendEmail.pending]: (state) => {
      state.loading = true;
    },
    [resendEmail.fulfilled]: (state) => {
      state.loading = false;
    },
    [resendEmail.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginUser.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [forgotPassword.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [resetPassword.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [validateUniqueEmail.pending]: (state) => {
      state.loading = true;
    },
    [validateUniqueEmail.fulfilled]: (state) => {
      state.loading = false;
    },
    [validateUniqueEmail.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [validateResetPasswordOtp.pending]: (state) => {
      state.loading = true;
    },
    [validateResetPasswordOtp.fulfilled]: (state) => {
      state.loading = false;
    },
    [validateResetPasswordOtp.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
    [setUserPin.pending]: (state) => {
      state.loading = true;
    },
    [setUserPin.fulfilled]: (state) => {
      state.loading = false;
    },
    [setUserPin.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },

    [uploadBusinessLogo.pending]: (state) => {
      state.loading = true;
    },
    [uploadBusinessLogo.fulfilled]: (state) => {
      state.loading = false;
    },
    [uploadBusinessLogo.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },

    [validateSSO.pending]: (state) => {
      state.loading = true;
    },
    [validateSSO.fulfilled]: (state) => {
      state.loading = false;
    },
    [validateSSO.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },

    [updateUserProfile.pending]: (state) => {
      state.loadUpdate = true;
    },
    [updateUserProfile.fulfilled]: (state) => {
      state.loadUpdate = false;
    },
    [updateUserProfile.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loadUpdate = false;
      state.isAuth = false;
      state = null;
    },
    [logoutUser.pending]: (state) => {
      state.loadLogout = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loadLogout = false;
    },
    [logoutUser.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loadLogout = false;
      state.isAuth = false;
      state = null;
    },
    [processInviteTeamRegistration.pending]: (state) => {
      state.loading = true;
    },
    [processInviteTeamRegistration.fulfilled]: (state) => {
      state.loading = false;
    },
    [processInviteTeamRegistration.rejected]: (state) => {
      // localStorage.removeItem("token");
      state.loading = false;
      state.isAuth = false;
      state = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, setUser, setBusiness, setAccountDetails } = user.actions;

export default user.reducer;