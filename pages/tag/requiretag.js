import Layout from '../../components/Layout'
import RequireTagComponent from '../../components/tag/requrieTagComponent'
import Link from 'next/link'

const requrieTag = () => {
    return(
        <Layout>
            <h2 className="text-center pt-4 pb-4">Request for Tag</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RequireTagComponent />
                </div>
            </div>
        </Layout>
    );
};

export default requrieTag;