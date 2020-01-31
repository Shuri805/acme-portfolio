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
  //const storage = window.localStorage;
  const notes = (await axios.get(`${API}/users/:id/notes`)).data;
  // storage.setItem('userId', user.id);
  return notes;
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

  // useEffect(()=>{
  //   fetchVacations()
  //     .then(vacations => setVacations(vacations));
  // }, []);

  // useEffect(()=>{
  //   fetchCompanies()
  //     .then(companies => setNotes(companies));
  // }, []);



  const changeUser = ()=> {
    window.localStorage.removeItem('userId');
    fetchUser()
      .then(user => setUser(user));
  };


  return (
    <div >
      <Header user ={user} changeUser={ changeUser } />
      <ul>
        <li><h2>Notes</h2>You have { notes.length } notes</li>
        <li><h2>Vacations</h2>You have {vacations.length} vactions</li>
        <li><h2>Following Companies</h2>You are following {companies.length} companies</li>
      </ul>

    </div>
  );
}

export default App;
