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
  display: 'inline-block',
  backgroundColor: '#188b31',
  color: '#fff',
  padding: '0.4rem 1.3rem',
  fontSize: '1rem',
  border: 'none',
  marginRight: '0.5rem',
  outline: 'none',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.45)',
  borderRadius: '5px',
};
export default Map;
