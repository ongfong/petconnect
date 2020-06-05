import React, {Component} from 'react';

import {getMap} from '../../actions/pet';
import fetch from 'isomorphic-fetch';
import {API, GOOGLE_MAP_API} from '../../config';

class Map extends Component {
  state = {
    email: '',
    map: '',
    disabled: false,
  };

  setLocation = () => {
    getMap(GOOGLE_MAP_API).then((data) => {
      this.setState({
        email: this.props.email,
        map: `https://maps.google.com/?q=${data.location.lat},${data.location.lng}`,
        disabled: true,
      });
    });
    window.alert('Get Location successful!');
  };
  getLocation = (location) => {
    return fetch(`${API}/pet/map`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <button
          style={getLoStyle}
          onClick={this.setLocation}
          disabled={this.state.disabled}
        >
          Get Location
        </button>
        <button
          style={getLoStyle}
          onClick={this.getLocation(this.state)}
          disabled={!this.state.disabled}
        >
          Send Email to Pet owner
        </button>
      </div>
    );
  }
}
const getLoStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  // backgroundColor: 'gray',
  // border: 'none',
  borderRadius: '10px',
  height: '35px',
  width: '200px',
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  marginTop: '1rem',
  marginBottom: '20px',
};
export default Map;
