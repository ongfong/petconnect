import Layout from '../../../components/Layout';
import PetCreate from '../../../components/crud/PetCreate';
import Link from 'next/link';

const Pet = () => {
    return (
        <Layout>
            {/* <div className="container-fluid"> */}
                <div className="row">
                    <div className="col-md-12 offset-md-0">
                        <PetCreate />
                    </div>
                </div>
            {/* </div> */}
        </Layout>
    );
};

export default Pet;