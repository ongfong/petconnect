import Layout from '../../components/Layout'
import RequestTagComponent from '../../components/tag/requestTagComponent'
import Link from 'next/link'

const requestTag = () => {
    return(
        <Layout>
            <h2 className="text-center pt-4 pb-4">Request for Tag</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RequestTagComponent />
                </div>
            </div>
        </Layout>
    );
};

export default requestTag;