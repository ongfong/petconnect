import Link from 'next/link';
import { useState, useEffect } from 'react';

import Router from 'next/router';
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
        return pets.map((pet, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>ID: {pet.id}</h3>
                    <p className="mark">
                    <section>
                    <img className="img img-fluid"
                        style={{ maxHeight: '150px', width: 'auto' }}
                        src={`${API}/pets/photo/${pet.id}`}
                        alt={pet.name}/>
                    </section>
                    <p>Category: {pet.categories[0].name}</p>
                    <p>Name: {pet.name}</p>
                    Post by {pet.postedBy.name} | Lost on {moment(pet.updatedAt).fromNow()}
                    </p>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {showAllLostPets()}
                </div>
            </div>
        </React.Fragment>
    );
}

export default LostListComponent;