import Link from 'next/link';
import { useState, useEffect } from 'react';

import { listLostPets } from '../../actions/pet';
import moment from 'moment';
import { API } from '../../config';

const LostListComponent = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        loadLostPets();
    }, []);

    const loadLostPets = () => {
        listLostPets().then(data => {
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
        }

        const post = {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            width: '80%',
            margin: 'auto'
        }
    
        return pets.map((pet, i) => {
            console.log(pet.gender);
            return (
                <section style={post} key={pet.id}>
                    <div style={style}>
                        <div key={i}>
                            <div className="row">
                                <div className="col-md-4">
                                    <section>
                                        <img className="img img-fluid"
                                            style={{ maxHeight: '150px', width: 'auto' }}
                                            src={`${API}/pets/photo/${pet.id}`}
                                            alt={pet.name}/>
                                    </section>
                                </div>
                                <div className="col-md-8">
                                    <div style={{padding: '20px'}}>
                                        <h4 style={{color:'#FC7139'}}>ID: {pet.id}</h4>
                                        <p>Category: <strong>{pet.categories[0].name}</strong></p>
                                        <p>Name: <strong>{pet.name}</strong></p>
                                        <p>Breed: <strong>{pet.breed}</strong></p>
                                        <p>Gender: <strong>{pet.gender}</strong></p>
                                        Post by <strong>{pet.postedBy.name} </strong> | Lost on <strong>{moment(pet.updatedAt).fromNow()}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        });
    };
    return (
        <React.Fragment>
            <div>
                <h2 style={{textAlign: 'center', padding: '20px', color: '#FC7139'}}>Lost Pets!</h2>
                <hr style={{width: '80%'}} />
                {showAllLostPets()}
            </div>
        </React.Fragment>
    );
}

export default LostListComponent;