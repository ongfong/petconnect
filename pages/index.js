import Layout from '../components/Layout';
import LostListComponent from '../components/lost/LostListComponent';
import Carousel from '../components/UI/Carousel/Carousel';
import Cards from '../components/UI/Card/Card';

const Index = () => {
    return (
        <Layout>
            <Carousel />
            <div className="policy" style={policyStyle}>
              <p style={fontStyle}>
                We love my pets and we know important of pets to pet owner.
              </p>
            </div>
                 <Cards />
            <section className="how-petconnect-works" style={sectionStyle}>
              <h2 style={titleStyle}>How Pet-Connect Works</h2>
                <ul style={ulStyle}>
                  <li style={linkStyle}>
                    <h2 style={h2Style}>Find your pet</h2>
                    <p style={pStyle}>
                      Find your pet when pet lost owner can inform then home page of Pet-Connect will display.
                    </p>
                  </li>
                  <li style={linkStyle}>
                    <h2 style={h2Style}>Request tag</h2>
                    <p style={pStyle}>
                      Request Tag for use tag to keep information of pet, inform when pet lost.
                    </p>
                  </li>
                  <li style={linkStyle}>
                    <h2 style={h2Style}>Pet was found</h2>
                    <p style={pStyle}>
                      When people found pet lost, you will recieve notification at email.
                    </p>
                  </li>
                </ul>
            </section>
            <LostListComponent></LostListComponent>
        </Layout>
    );
};

//policy
const policyStyle = { 
  border: '2px solid orange',
  borderRadius: '.625em',
  padding: '1em',
  fontSize: '21px',
  position: 'relative',
  width: '80%',
  maxWidth: '1075px',
  margin: '3em auto 1em',
  webkitTransition: 'font-size .5s',
  transition: 'font-size .5s',
  marginBottom: '50px',
};

const fontStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  letterSpacing: '.1px',
  lineHeight: '26px',
  width: '100%',
  maxWidth: '33.333em',
  textAlign: 'center',
  margin: '0 auto',
};

const sectionStyle = {
  backgroundSize: '120% 100%', 
  padding: '10px 35px 35px',
  textAlign: 'center',
  display: 'block',
  marginBottom: '50px',
  marginTop: '50px',
};

const ulStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0'
};

const titleStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '.1px',
  textAlign: 'center',
  lineHeight: '38px',
  paddingBottom: '20px',
  marginTop: '30px'
};

const h2Style = {
  fontWeight: 'bold',
  fontSize: '22px',
  letterSpacing: '.1px',
  textAlign: 'center',
  lineHeight: '20px',
  marginBlockEnd: '19.92px',
  marginBlockStart: '19.92px'
};

const pStyle = {
  color: '#000',
  fontSize: '16px',
  textAlign: 'Center',
  letterSpacing: '.1px',
  lineHeight: '26px',
  marginBlockEnd: '16px',
  marginBlockStart: '16px'
};

const linkStyle = {
  width: '100%',
  textAlign: 'center',
};

const lostStyle2 = {
  fontWeight: 'bold',
  textAlign: 'center'
};

export default Index;