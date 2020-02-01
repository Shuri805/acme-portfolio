import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import {fetchUser, fetchVacations, fetchNotes, fetchFollowingCompanies} from './api';
import qs from 'qs';
import Home from './Home';

const getHash = ()=> {
  return window.location.hash.slice(1);
}

function App() {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [followingCompanies, setFollowingCompanies] = useState([]);
  const [ params, setParams ] = useState(qs.parse(getHash()));

  const fetchAndSetUser = ()=> {
    fetchUser()
    .then( user => setUser(user));
  };

  const changeUser = ()=> {
    window.localStorage.removeItem('userId');
    fetchAndSetUser();
  };

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

  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(getHash()));
    });
  }, []);

  console.log(params);

  return (
    <div >
      <Header user ={user} changeUser={ changeUser } />
      {!params.view && <Home notes={notes} vacations={vacations} followingCompanies={followingCompanies}/>}
    </div>
  );
}

export default App;







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

