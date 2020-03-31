import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { listLostPets } from '../../actions/pet';
import moment from 'moment';

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
                    <h3>{pet.id}</h3>
                    <p className="mark">
                        Post by {pet.postedBy.name} | Published on {moment(pet.updatedAt).fromNow()}
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