import Layout from '../components/Layout';
import Link from 'next/link';
import LostListComponent from '../components/lost/LostListComponent'

const Index = () => {
    return (
        <Layout>
            <LostListComponent></LostListComponent>
        </Layout>
    );
};

export default Index;