import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import jwtDecode from 'jwt-decode';
import SplashScreen from 'src/components/SplashScreen';
import axios from 'src/utils/axios';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,

};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken, userid, is_superuser, loggedin_id, user_type, organizer_id) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userid);
    localStorage.setItem('isSuperUser', is_superuser);
    localStorage.setItem('loggedin_id', loggedin_id);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('organizer_id', organizer_id);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}##${userid}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isSuperUser');
    localStorage.removeItem('loggedin_id');
    localStorage.removeItem('user_type');
    localStorage.removeItem('organizer_id');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user, usermenu, userfields } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user: user,

      };
    }
    case 'LOGIN': {
      const { isAuthenticated, user, usermenu, userfields } = action.payload;
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        user: user,

      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,

      };
    }
    case 'REGISTER': {
      debugger;
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (email, password) => {
    const response = await axios.post('api/user/login', { email, password });

    let user = []
    user = response.data[0];


    if (user.access_token !== undefined) {
      setSession(user.access_token, user.user_id, user.super_user, user.id, user.user_type, user.organizer_id);
      dispatch({
        type: 'LOGIN',
        payload: {
          isAuthenticated: true,
          user,

        }
      });
    }
  };
  const register = async (email, first_name, last_name, phone_number, occupation, location, yourrole, childage, organizer_id) => {
    const response = await axios.post('/api/user/temp_user_create', {
      email,
      first_name,
      last_name,
      phone_number,
      occupation,
      location,
      yourrole,
      childage,
      organizer_id
    });
    let user = []
    user = response.data
    // if (user.access_token !== undefined) {
    //   setSession(user.access_token, user.user_id, user.super_user, user.id, user.user_type, user.organizer_id);
      dispatch({
        type: 'REGISTER',
        payload: {
          isAuthenticated: true,
          user
        }
      });
    //}
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userId = window.localStorage.getItem('userId');
        const isSuperUser = window.localStorage.getItem('isSuperUser');
        const loggedin_id = window.localStorage.getItem('loggedin_id');
        const user_type = window.localStorage.getItem('user_type');
        const organizer_id = window.localStorage.getItem('organizer_id');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, userId, isSuperUser, loggedin_id, user_type, organizer_id);

          const response = await axios.get('api/user/me');
          let user = []
          user = response.data[0];

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user: user,

            }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null,

            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null,

          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;