import Layout from '../components/Layout';
import Link from 'next/link';
import LostListComponent from '../components/lost/LostListComponent'
import Carousel from '../components/UI/Carousel/Carousel'

const Index = () => {
    return (
        <Layout>
            <Carousel />
            <LostListComponent></LostListComponent>
        </Layout>
    );
};

export default Index;