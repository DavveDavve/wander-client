import React, { useState, useEffect } from "react"
import { Card, Image, Header, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SearchResults = props => {
  
  const [results, setResults] = useState([])

  useEffect(() => {
    setResults(props.location.state.searchResults)
  }, [])
  
  let trailsList, goBack

  goBack = () => {
    props.history.goBack()
  }

  if (results.length !== 0) {
    trailsList = (
      <>
        {results.map(trail => {
          return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                    <Card color='olive' id={`card_${trail.id}`}>
                      <Image
                        id={`image_${trail.id}`}
                        src={trail.image}
                      />
                      <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                      <Card.Description id={`description_${trail.id}`}>Description: {trail.description}</Card.Description>
                      <Card.Description id={`extra_${trail.id}`}>Good to know: {trail.extra}</Card.Description>
                      <Card.Meta id={`city_${trail.id}`}>City: {trail.city}</Card.Meta>
                      <Card.Meta id={`country_${trail.id}`}>Country: {trail.country}</Card.Meta>
                      <Card.Meta id={`continent_${trail.id}`}>Continent: {trail.continent}</Card.Meta>
                      <Card.Meta id={`duration_${trail.id}`}>Duration: {trail.duration}</Card.Meta>
                      <Card.Meta id={`intensity_${trail.id}`}>Intensity: {trail.intensity}</Card.Meta>
                    </Card>
                  </NavLink>
        })}
      </>
    )
  } else {
    trailsList = (
      <center><p>Sorry, there are no trails that match your search.</p></center>
    ) 
  }
  return (
    <div id='search-results'>
      <Header as='h2' textAlign='center'>Found adventures</Header>  
      <Label as='a' color='olive' id='back-button' onClick={goBack} href='#'>Go Back</Label>    
      <div id='trail-list'>
        {trailsList}
      </div>
    </div>
  )
}

export default SearchResults
