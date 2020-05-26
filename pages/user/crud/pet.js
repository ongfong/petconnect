import Layout from '../../../components/Layout';
import PetCreate from '../../../components/crud/PetCreate';
import Link from 'next/link';

const Pet = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <PetCreate />
        </div>
      </div>
    </Layout>
  );
};

export default Pet;
