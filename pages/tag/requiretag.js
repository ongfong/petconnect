import Layout from '../../components/Layout'
import RequireTagComponent from '../../components/tag/requrieTagComponent'
import Link from 'next/link'

const requrieTag = () => {
    return(
        <Layout>
            {/* <h2 className="text-center pt-4 pb-4" style={requestTagStyle}>Request Tag</h2> */}
            <div className="row">
                <div className="col-md-12 offset-md-0">
                    <RequireTagComponent />
                </div>
            </div>
        </Layout>
    );
};

export default requrieTag;