import './App.css'
import Map, { Marker, Popup } from 'react-map-gl'
import { useState, useEffect } from 'react'
import { Room, Star } from '@mui/icons-material'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import { format } from 'timeago.js'

function App() {
  const currentUser = 'zahra'
  const [viewport, setViewport] = useState({
    longitude: 37,
    latitude: 40,
    zoom: 4,
  })
  const [pins, setPins] = useState([])
  const [currentPlaceID, setCurrentPlaceID] = useState(null)

  const handleMarkerClick = (id) => {
    setCurrentPlaceID(id)
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        console.log(res.data)
        setPins(res.data)
      } catch (err) {
        console.log('error')
        console.log(err)
      }
    }
    getPins()
  }, [])

  return (
    <Map
      initialViewState={{
        viewport,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoiei1hLTI1NTAiLCJhIjoiY2xkeWt6eDc2MGR3MzNubndiOGhnbWozZiJ9.i7EYjCIRaUovS6BGjQwk2A"
      style={{ width: '100vw', height: '100vh' }}
    >
      {pins.map((pin) => (
        <>
          <Marker longitude={pin.lng} latitude={pin.lat} anchor="bottom">
            <Room
              style={{
                fontSize: viewport.zoom * 7,
                cursor: 'pointer',
                color: pin.username === currentUser ? 'tomato' : 'slateblue',
              }}
              onClick={handleMarkerClick(pin._id)}
            />
          </Marker>
          {pin._id === currentPlaceID && (
            <Popup
              longitude={pin.lng}
              latitude={pin.lat}
              anchor="left"
              closeButton={true}
              onClose={setCurrentPlaceID(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="desc">{pin.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{pin.username}</b>
                </span>
                <span className="date">{format(pin.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  )
}

export default App
