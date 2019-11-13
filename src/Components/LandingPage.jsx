import React, { Component } from 'react'
import { getTrails } from '../Modules/trailsData'
import { Card, Image, Grid } from 'semantic-ui-react'
import Sarek from '../Images/sarek.jpg'
import { NavLink } from 'react-router-dom'

class LandingPage extends Component {
  state = {
    trails: [],
    errorMessage: null,
    hover: false
  }

  async componentDidMount() {
    let response = await getTrails()
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        trails: response
      })
    }
  }

  render() {
    let trailsData = this.state.trails
    let errorMessage, trailsList
    let sarek = <center><img src={Sarek} alt='Sarek national park' position='centered' width='1400' height='720' id='sarek-image'/></center>

    if (this.state.errorMessage) {
      errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }

    if (trailsData.length !== 0) {
      trailsList = (
        <>
          {trailsData.map(trail => {
            return  <NavLink id={`trail_${trail.id}`} key={trail.id} to={`/trails/${trail.id}`}>
                      <Card id={`card_${trail.id}`}>
                        <Card.Header id={`title_${trail.id}`}>{trail.title}</Card.Header>
                        <Image
                          id={`image_${trail.id}`}
                          src={trail.image}
                          onMouseOut={() => this.setState({hover: false})}
                          onMouseOver={() => this.setState({hover: true})}
                          style={{transform: `${this.state.hover ? 'scale(1.5,1.5)' : 'scale(1,1)'}`}}
                        />
                        <Card.Description id={`description_${trail.id}`}>{trail.description}</Card.Description>
                        <Card.Description id={`extra_${trail.id}`}>{trail.extra}</Card.Description>
                        <Card.Meta id={`location_${trail.id}`}>{trail.location}</Card.Meta>
                        <Card.Meta id={`duration_${trail.id}`}>{trail.duration}</Card.Meta>
                        <Card.Meta id={`intensity_${trail.id}`}>{trail.intensity}</Card.Meta>
                      </Card>                      
                    </NavLink>

          })}
        </>
      )
    }

    return (
      <>
        {sarek}
          <Grid centered container columns={3}>
            <Grid.Row>
            {trailsList}
            </Grid.Row>
          </Grid>
          {errorMessage}
      </>
    )
  }
}

export default LandingPage