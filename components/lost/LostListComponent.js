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
        return pets.map((pet, i) => {
            return (
               <div className="max-w-sm rounded overflow-hidden shadow-lg">
                   <img src={`${API}/pets/photo/${pet.id}`} alt={pet.name} className="w-full" />
               </div>
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