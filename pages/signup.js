import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Link from 'next/link'

const Signup = () => {
    return(
        <Layout>
            {/* <h2 className="text-center pt-4 pb-4" style={{fontFamily: 'Courier', fontWeight: 'bold', marginTop: '50px'}}>Signup</h2> */}
            <div className="row">
                <div className="col-md-12 offset-md-0">
                    <SignupComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signup;