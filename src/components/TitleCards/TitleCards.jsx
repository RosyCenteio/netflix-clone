import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards__data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();


  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTBhOGY0NzFkMGVhNzBlNTcyYmE3OGQ1ZDg4OTBiYSIsIm5iZiI6MTc3MTE2MjE1My4wMzUsInN1YiI6IjY5OTFjYTI5MmUxODdmOTM3YTk1OGRhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.udShZMwe_CYdV5Ym44uHYQs6cOt9YdexFIL-c2gIqFs'
  }
};


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel)
  })

  return (
    <div className='title-cards'>
      <h2>{title? title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}> 
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" className="card-img"/>
              <p className="card-title">{card.original_title}</p>
            </Link>
          )
    })}
      </div>
    </div>
  )
}

export default TitleCards
