import Layout from '../../components/Layout';

import RequireTagComponent from '../../components/tag/requrieTagComponent';
// import Contact from '../../components/Map/contact';

const requrieTag = () => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12 offset-md-0">
          <RequireTagComponent />
          {/* <Contact /> */}
        </div>
      </div>
    </Layout>
  );
};

export default requrieTag;
