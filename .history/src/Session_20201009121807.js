import React from 'react'
import axios from 'src/utils/axios';

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

class Session extends React.Component{
    constructor(props) {
      super(props)
 

      this.handleUnload = this.handleUnload.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener('beforeunload', this.handleUnload);
    }
  
    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.handleUnload);
    }
  
    handleUnload(e) {
    //   var message = "\o/";
      if (window.performance) {
        if (performance.navigation.type == 1) {
           alert( "This page is reloaded" );
        }// else {
        //   const response = axios.post('/api/user/logout',)
        //   let user = []
        //   user = response.data
        //   setSession(null);
        // }
      } else {
        const response = axios.post('/api/user/logout',)
        let user = []
        user = response.data
        setSession(null);
      }
    }}
      
      
      // const response = axios.post('/api/user/logout',)
      // let user = []
      // user = response.data
      // // setSession(null);
  
    //   (e || window.event).returnValue = message; //Gecko + IE
      return ;
    }
    render=()=>(
        <div></div>
    )
  
  }
  export default Session