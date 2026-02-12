import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice(
    {
        name: 'user',
        initialState: { userData: null , loading: true},
        reducers:
        {
            setUserData: (state, action) => {
                state.userData = action.payload;
            },

                   setLoading: (state, action) => {
                state.loading = action.payload;
            }
        }
    });


// 🔹 Thunk to restore user after refresh / Stripe redirect
export const fetchCurrentUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.get(
            `${process.env.CLIENT_URL}/api/auth/get-current-user`,
            { withCredentials: true }   // VERY IMPORTANT
        );

        dispatch(setUserData(response.data));
    } catch (error) {
        dispatch(setUserData(null));
    } finally {
        dispatch(setLoading(false));
    }
};

export const { setUserData , setLoading} = userSlice.actions;
export default userSlice.reducer;