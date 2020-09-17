import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import jwtDecode from 'jwt-decode';
import SplashScreen from 'src/components/SplashScreen';
import axios from 'src/utils/axios';
import socket from 'src/slices/socket';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  redirectpath: "/app/lobby",
  newuser: false,
  phone: null,
  client: socket()

};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }  
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};


const setSession = (accessToken, userid, is_superuser, loggedin_id, user_type) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userid);
    localStorage.setItem('isSuperUser', is_superuser);
    localStorage.setItem('loggedin_id', loggedin_id);
    localStorage.setItem('user_type', user_type);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}##${userid}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isSuperUser');
    localStorage.removeItem('loggedin_id');
    localStorage.removeItem('user_type');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
        newuser: false,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        newuser: false,
      };
    }
    case 'NOTUSERFOUND': {
      const { phone } = action.payload;
      return {
        ...state,
        isAuthenticated: false,
        redirectpath: "/register",
        newuser: true,
        phone: phone
      };
    }
    case 'SETNEWUSER': {
      return {
        ...state,
        newuser: false,
      };
    }
    case 'REGISTER': {
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

  const login = async (phone_number) => {
    dispatch({
      type: 'SETNEWUSER'
    });

    const response = await axios.post('api/user/front_login', { phone_number });
    let user = []
    user = response.data
    if (user.access_token !== undefined) {
      setSession(user.access_token, user.user_id, user.super_user, user.id, user.user_type);
      dispatch({
        type: 'LOGIN',
        payload: {
          isAuthenticated: true,
          user
        }
      });


    }
    else {
      dispatch({
        type: 'NOTUSERFOUND',
        payload: {
          phone: phone_number
        }
      });
    }
  };
  const logout = () => {
    localStorage.clear()
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };
  const register = async (email, first_name, last_name, company, designation, phone_number, organizer_id) => {    
    const response = await axios.post('/api/visitor/new', {
      email,
      first_name,
      last_name,
      company,
      designation,
      phone_number,
      organizer_id
    });
    let user = []
    user = response.data   
    if (user.access_token !== undefined) {
      setSession(user.access_token, user.user_id, user.super_user, user.id, user.user_type);
      dispatch({
        type: 'REGISTER',
        payload: {
          isAuthenticated: true,
          user
        }
      });
    }
  };
  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userId = window.localStorage.getItem('userId');
        const isSuperUser = window.localStorage.getItem('isSuperUser');
        const loggedin_id = window.localStorage.getItem('loggedin_id');
        const user_type = window.localStorage.getItem('user_type');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, userId, isSuperUser, loggedin_id, user_type);
          const response = await axios.get('api/user/me');
          let user = []
          user = response.data[0];

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {         
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
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