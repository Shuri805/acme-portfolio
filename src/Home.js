import React from 'react';


const Home = ({notes, vacations, followingCompanies}) => {
  return(
    <ul>
      <li><h2>Notes</h2>You have { notes.length } notes</li>
      <li><h2>Vacations</h2>You have {vacations.length} vactions</li>
      <li><h2>Following Companies</h2>You are following {followingCompanies.length} companies</li>
    </ul>
  )
}

export default Home;
