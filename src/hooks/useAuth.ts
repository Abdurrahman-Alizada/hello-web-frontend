import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutUser } from '@/redux/reducers/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    isAuthenticated,
    logout,
  };
};