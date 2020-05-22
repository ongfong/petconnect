import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';
import Private from '../../components/auth/Private';
import { listPets, removePet, lost, find } from '../../actions/pet';
import moment from 'moment';
import { API } from '../../config';
import Link from 'next/link';

const ListPets = ({ pets, query }) => {

    const [pet, setPets] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    const deletePet = id => {
        removePet(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                window.location.reload();
            }
        });
    };

    const lostPet = id => {
        lost(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
    };

    const findPet = id => {
        find(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
    };

    const deleteConfirm = id => {
        let answer = window.confirm('Are you sure you want to delete your pet?');
        if (answer) {
            deletePet(id);
        }
    };

    const lostConfirm = id => {
        let answer = window.confirm('Are you sure your pet lost? if sure when someone found your pet it will inform at email');
        if (answer) {
            lostPet(id);
           
        }
    };

    const findConfirm = id => {
        let answer = window.confirm('Are you sure your pet find?');
        if (answer) {
            findPet(id);
        }
    };

    const showAllPets = () => {
        return pets.map((pet, i) => {
            return (
                <div style={style}>
                    <article key={i}>
                    <div className="lead pb-4">
                        <section>
                            <p>The owner is {pet.postedBy.name} | Published {moment(pet.updatedAt).fromNow()}</p>
                        </section>

                        <div className="row">
                            <div className="col-md-4">
                                <section>
                                    <img
                                        className="img img-fluid"
                                        style={{ maxHeight: '200px', width: 'auto' }}
                                        src={`${API}/pets/photo/${pet.id}`}
                                        alt={pet.name}/>
                                </section>
                                {/* <Link href={`/pet/${pet.id}`}>
                                    <button type="submit" className="btn btn-primary" style={buttonStyle}>
                                        Update profile
                                    </button>
                                    <a className="btn btn-primary pt-2" style={{marginTop: '20px'}}>Update profile</a>
                                </Link> */}
                            </div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3" style={nameStyle}>ID: <strong>{pet.id}</strong></div>
                                    <div className="pb-3" style={nameStyle}>Name: <strong>{pet.name}</strong></div>   
                                    <Link href={`/pet/${pet.id}`}>
                                        {/* <a className="btn btn-primary pt-2">Update profile</a> */}
                                        <button type="submit" className="btn btn-primary pt-2" style={buttonUpdateStyle}>
                                            Update profile
                                        </button>
                                    </Link>
                                </section>
                                <button className="btn btn-warning btn-md" style={buttonLostStyle} onClick={() => lostConfirm(pet.id)} > 
                                        Lost
                                </button>
                                <button className="btn btn-success btn-md" style={buttonFindStyle} onClick={() => findConfirm(pet.id)}>
                                        Find
                                </button>
                                <br></br>
                                <button className="btn btn-danger btn-md" style={buttonDeleteStyle} onClick={() => deleteConfirm(pet.id)}>
                                        Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
                </div>
            );
        });
    };


    return (
        <React.Fragment>
        <Layout>
            <Private> 
                {/* <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a href="/user/crud/pet">Create Pets </a>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update">Update profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                

                {/* <Navbar expand="md" style={navStyle}>
                    <Link href="/user/crud/pet">
                        <NavLink style={createPetStyle}>Create Pets</NavLink>
                    </Link>
                    <Link href="/user/update">
                        <NavLink style={updateProfileStyle}>Update profile</NavLink>
                    </Link>
                </Navbar> */}
            </Private>
            <div className="container-fluid" style={containerStyle}>
                <div className="row">
                    <div className="col-md-12">
                        {message && <div className="alert alert-warning">{message}</div>}
                        {showAllPets()}
                    </div>
                </div>
            </div>
        </Layout>
        </React.Fragment>
    );
};


ListPets.getInitialProps = ({ query }) => {
    return listPets(query.user).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { pets: data.pets, query };
        }
    });
};

const style = {
    padding: '16px',
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    margin: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#E6EAEC',
}

const nameStyle = {

    src: 'url(../../../fonts/BANGNA-NEW.TTF)',
};

const buttonUpdateStyle = {
    backgroundColor: '#0384BD',
    marginBottom: '5px',
    border: 'none',
};

const buttonLostStyle = {
    backgroundColor: '#FEC748',
    marginBottom: '5px',
    marginRight: '5px',
    border: 'none',
};

const buttonFindStyle = {
    backgroundColor: '#AEC33A',
    color: '#262626',
    marginBottom: '5px',
    marginRight: '5px',
    border: 'none',
};

const buttonDeleteStyle = {
    backgroundColor: '#D92139',
    marginBottom: '5px',
    border: 'none',
};

const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    left: '0'
};

export default withRouter(ListPets);