import Layout from '../../../components/Layout';
import PetCreate from '../../../components/crud/PetCreate';
import Link from 'next/link';

const Pet = () => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>Create a new pet</h2>
                    </div>
                    <div className="col-md-12">
                        <PetCreate />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pet;