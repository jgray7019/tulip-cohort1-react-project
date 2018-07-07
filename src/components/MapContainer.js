import React  from 'react';
import {GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
const GAPI_KEY = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";

export class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state ={ 
			showingInfoWindow: false,
	    	activeMarker: {},
	   		selectedPlace: {}
		}
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.onMapClicked = this.onMapClicked.bind(this);
	}

	onMarkerClick = (props, marker, e) =>
	  this.setState({
	    selectedPlace: props,
	    activeMarker: marker,
	    showingInfoWindow: true
	  });
	
	onMapClicked = (props) => {
	  if (this.state.showingInfoWindow) {
	    this.setState({
	      showingInfoWindow: false,  
	      activeMarker: null
	    })
	  }
	};

  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
     return (
      <div style={style}>
         <Map 
         	google={this.props.google} 
         	//inventory={this.props.inventory}
         	onClick={this.onMapClicked}
         	zoom={10}
         	initialCenter={{
            	lat: 43.6584,
            	lng: -79.3900
            }}

 		>

 		{console.log(this.props.inventory)}
 		{this.props.inventory.map(location => {
 			if(location.quantity > 0) {
 			return(
 				<Marker
 					onClick={this.onMarkerClick}
 					key={location.id}
 					name={location.name}
 					position={{lat: location.lat, lng: location.lng}} 
 					quantity={location.quantity}
 					address={location.address}
 					city={location.city}
 				/>
 			)
 			}
 		})}

			<InfoWindow
				marker={this.state.activeMarker}
				onClose={this.onInfoWindowClose}

				visible={this.state.showingInfoWindow}>
				<div>
					<h2>
						{this.state.selectedPlace.name}
					</h2>
					<p>City: {this.state.selectedPlace.city}</p>
					<p>Address: {this.state.selectedPlace.address}</p>
					<p>Quantity: {this.state.selectedPlace.quantity}</p>
				</div>
			</InfoWindow>
      	</Map>
      </div>
      )
  }
}

export default GoogleApiWrapper({
  apiKey: GAPI_KEY
})(MapContainer);