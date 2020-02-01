import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Header from './Header'
import {fetchUser, fetchVacations, fetchNotes, fetchFollowingCompanies} from './api'


function App() {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [followingCompanies, setFollowingCompanies] = useState([]);

  const fetchAndSetUser = ()=> {
    fetchUser()
    .then( user => setUser(user));
  };

  // useEffect(()=>{
  //   fetchUser()
  //   .then(user => setUser(user));
  // },[]);

  // useEffect(()=>{
  //   fetchNotes()
  //     .then(notes => setNotes(notes));
  // }, []);

  // useEffect(()=>{
  //   fetchVacations()
  //     .then(vacations => setVacations(vacations));
  // }, []);

  // useEffect(()=>{
  //   fetchCompanies()
  //     .then(companies => setNotes(companies));
  // }, []);


// const fetchNotes = async ()=> {
//   //const storage = window.localStorage;
//   const notes = (await axios.get(`${API}/users/:id/notes`)).data;
//   // storage.setItem('userId', user.id);
//   return notes;
// }

  useEffect(()=> {
    if(user.id){
      Promise.all([
        fetchNotes(user.id),
        fetchVacations(user.id),
        fetchFollowingCompanies(user.id)
      ])
      .then(([_notes, _vacations, _followingCompanies])=>{
        setNotes(_notes);
        setVacations(_vacations);
        setFollowingCompanies(_followingCompanies);
      });
    }
  }, [user.id]);


  const changeUser = ()=> {
    window.localStorage.removeItem('userId');
    fetchAndSetUser();
  };


  return (
    <div >
      <Header user ={user} changeUser={ changeUser } />
      <ul>
        <li><h2>Notes</h2>You have { notes.length } notes</li>
        <li><h2>Vacations</h2>You have {vacations.length} vactions</li>
        <li><h2>Following Companies</h2>You are following {followingCompanies.length} companies</li>
      </ul>

    </div>
  );
}

export default App;


