import Link from 'next/link';
import {useState, useEffect} from 'react';

import {listLostPets} from '../../actions/pet';
import moment from 'moment';
import {API} from '../../config';

const LostListComponent = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    loadLostPets();
  }, []);

  const loadLostPets = () => {
    listLostPets().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPets(data);
      }
    });
  };

  const showAllLostPets = () => {
    const style = {
      width: '80%',
      padding: '16px',
      textAlign: 'center',
      border: '1px solid #eee',
      boxShadow: '0 2px 3px #ccc',
      margin: '10px',
      boxSizing: 'border-box',
    };

    const post = {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      width: '80%',
      margin: 'auto',
    };

    return pets.map((pet, i) => {
      return (
        <div
          className="col-md-4"
          key={i}
          style={{fontFamily: 'Kanit', marginBottom: '20px'}}
        >
          <div className="card fixed-width" style={{width: '18rem'}}>
            <img
              className="card-img-top"
              style={imgStyle}
              src={`${API}/pets/photo/${pet.id}`}
              alt={pet.name}
            />
            <div className="card-body">
              <h4 style={{fontFamily: 'Kanit', color: '#FC7139'}}>
                ID: {pet.id}
              </h4>
              <p className="card-text">
                Category: <strong>{pet.categories[0].name}</strong>
              </p>
              <p className="card-text">
                Name: <strong>{pet.name}</strong>
              </p>
              <p className="card-text">
                Breed: <strong>{pet.breed}</strong>
              </p>
              <p className="card-text">
                Gender: <strong>{pet.gender}</strong>
              </p>
              Post by <strong>{pet.postedBy.name} </strong> <br />| Lost on{' '}
              <strong>{moment(pet.updatedAt).fromNow()}</strong>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <div className="container">
        <h2
          style={{
            fontFamily: 'Kanit',
            textAlign: 'center',
            padding: '20px',
            color: '#FC7139',
          }}
        >
          Lost Pets!
        </h2>
        {/* <hr style={{width: '80%'}} /> */}
        <div className="row">{showAllLostPets()}</div>
      </div>
    </React.Fragment>
  );
};

const serviceItem = {
  textAlign: 'center',
  padding: '10px 10px 18px 10px',
  background: '#ffffff',
  boxShadow: '0px 10px 25px rgba(206, 206, 206, 0.5)',
  marginBottom: '30px',
};

const imgStyle = {
  height: '300px',
  width: '100%',
};

export default LostListComponent;
