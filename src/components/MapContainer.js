import React  from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
const GAPI_KEY = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";

export class MapContainer extends React.Component {
  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
     return (
      <div style={style}>
         <Map 
         	google={this.props.google} 
         	inventory={this.props.inventory}
         	zoom={14}
         	initialCenter={{
            	lat: 43.6584,
            	lng: -79.3900
            }}
 		>

 		{console.log(this.props.inventory)}
 		{this.props.inventory.map(location => {
 			if(location.quantity > 0) {
 				//{console.log(location.lat)}
 			

 			return(
   
 				<Marker
 					//key={location.id}
 					 position={{lat: location.lat, lng: location.lng}} 
 				/>
 			)
 		}
 		})}
      
      </Map>
      </div>
      )
  }
}

export default GoogleApiWrapper({
  apiKey: GAPI_KEY
})(MapContainer);