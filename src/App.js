import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Header from './Header'
const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async ()=> {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if(userId){
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    }
    catch(ex){
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return  user;
};

const fetchNotes = async ()=> {

}


function App() {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(()=>{
    fetchUser()
    .then(user => setUser(user));
  },[]);

  useEffect(()=>{
    fetchNotes()
      .then(notes => setNotes(notes));
  }, []);

  const changeUser = ()=> {
    window.localStorage.removeItem('userId');
    fetchUser()
      .then(user => setUser(user));
  };


  return (
    <div >
      <Header user ={user} changeUser={ changeUser } />
    </div>
  );
}

export default App;
