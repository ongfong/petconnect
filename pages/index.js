import Layout from '../components/Layout';
import LostListComponent from '../components/lost/LostListComponent';
import Carousel from '../components/UI/Carousel/Carousel';
import Cards from '../components/UI/Card/Card';
import {View, MaterialIcons} from 'reactstrap';
const Index = () => {
  return (
    <Layout>
      <Carousel />
      <div className="policy" style={policyStyle}>
        <h4 style={{textAlign: 'center'}}>
          " We love my pets and we know important of pets to pet owner "
        </h4>
      </div>
      {/* <Cards /> */}
      {/* <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6">
                  <div class="services-item" style={serviceItem}>
                    <img 
                      src="https://images.pexels.com/photos/1139793/pexels-photo-1139793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      style={imgStyle}/>
                      <h3>Request Tag</h3>
                      <p>1. Click Request Tag.</p>
                      <p>2. fill information is name, email address.</p>
                      <p>3. Pet-Connect will send tag for you.</p>
                  </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="services-item" style={serviceItem}>
                    <img 
                        src="https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        style={imgStyle} />
                        <h3>Register Tag</h3>
                        <p>1. Click Create Pet.</p>
                        <p>2. Add information by ID and Pin get from Email.</p>
                        <p>3. Your pet created by pet owner can inform when lost, find and delete.</p>
                  </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="services-item" style={serviceItem}>
                    <img 
                        src="https://images.pexels.com/photos/3884376/pexels-photo-3884376.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        style={imgStyle2}/>
                        <h3>Update Profile</h3>
                        <p>1. Click Update Profile.</p>
                        <p>2. Fill information that want to edit profile.</p>
                        <p>3. Click submit then information was updated.</p>
                  </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="services-item" style={serviceItem}>
                    <img 
                        src="https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        style={imgStyle2}/>
                          <h3>Inform when found pet lost</h3>
                          <p>1. Scan QR Code that attached to the collar.</p>
                          <p>2. See information of pet lost..</p>
                          <p>Thank you for help pet :D</p>
                  </div>
              </div>
            </div> */}

      <div
        className="container-fluid"
        style={{backgroundColor: '#f2f2f2', paddingBottom: '20px'}}
      >
        <section className="item-category-area section-gap">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 pb-80 header-text text-center">
                <h1
                  className="pb-10"
                  style={{paddingTop: '50px', paddingBottom: '50px'}}
                >
                  HOW TO
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="single-cat-item" style={itemStyle}>
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/667228/pexels-photo-667228.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    style={imgHowtoStyle}
                  />
                  <h4 style={h4Style}>Request Tag</h4>
                  <p style={pHowtoStyle}>1. Click Request Tag.</p>
                  <p style={pHowtoStyle}>
                    2. fill information is name, email address.
                  </p>
                  <p style={pHowtoStyle}>
                    3. Pet-Connect will send tag for you.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-cat-item">
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/936317/pexels-photo-936317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    style={imgHowtoStyle}
                  />
                  <h4 style={h4Style}>Register Tag</h4>
                  <p style={pHowtoStyle}>1. Click Create Pet.</p>
                  <p style={pHowtoStyle}>
                    2. Add information by ID and Pin get from Email.
                  </p>
                  <p style={pHowtoStyle}>
                    3. Your pet created by pet owner can inform when lost, find
                    and delete.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-cat-item">
                  <img
                    className="img-fluid"
                    src="https://images.pexels.com/photos/582070/pexels-photo-582070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    style={imgHowtoStyle}
                  />
                  <h4 style={h4Style}>Update Profile</h4>
                  <p style={pHowtoStyle}>1. Click Update Profile.</p>
                  <p style={pHowtoStyle}>
                    2. Fill information that want to edit profile.
                  </p>
                  <p style={pHowtoStyle}>
                    3. Click submit then information was updated.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-cat-item">
                  <div className="thumb">
                    <img
                      className="img-fluid"
                      src="https://images.pexels.com/photos/4203280/pexels-photo-4203280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      style={imgHowtoStyle}
                    />
                  </div>
                  <h4 style={h4Style}>Inform when found pet lost</h4>
                  <p style={pHowtoStyle}>
                    1. Scan QR Code that attached to the collar.
                  </p>
                  <p style={pHowtoStyle}>2. See information of pet lost..</p>
                  <p style={pHowtoStyle}>Thank you for help pet :D</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="how-petconnect-works" style={sectionStyle}>
        <h2 style={titleStyle}>How Pet-Connect Works</h2>
        <ul style={ulStyle}>
          <li style={linkStyle}>
            <h2 style={h2Style}>Find your pet</h2>
            <p style={pStyle}>
              Find your pet when pet lost owner can inform then home page of
              Pet-Connect will display.
            </p>
          </li>
          <li style={linkStyle}>
            <h2 style={h2Style}>Request tag</h2>
            <p style={pStyle}>
              Request Tag for use tag to keep information of pet, inform when
              pet lost.
            </p>
          </li>
          <li style={linkStyle}>
            <h2 style={h2Style}>Pet was found</h2>
            <p style={pStyle}>
              When people found pet lost, you will recieve notification at
              email.
            </p>
          </li>
        </ul>
      </section>
      <LostListComponent></LostListComponent>
    </Layout>
  );
};
const serviceItem = {
  textAlign: 'center',
  padding: '10px 10px 18px 10px',
  background: '#ffffff',
  boxShadow: '0px 10px 25px rgba(206, 206, 206, 0.5)',
  marginBottom: '30px',
};

const itemStyle = {
  marginBottom: '30px',
  textAlign: 'left',
};

const imgStyle = {
  marginBottom: '28px',
  minWidth: '100%',
  maxWidth: '100%',
  verticalAlign: 'middle',
  borderStyle: 'none',
};

const imgStyle2 = {
  marginBottom: '28px',
  minWidth: '100%',
  maxWidth: '100%',
  verticalAlign: 'middle',
  borderStyle: 'none',
};

const imgHowtoStyle = {
  borderRadius: '190px',
  maxWidth: '100%',
  height: 'auto',
  verticalAlign: 'middle',
  borderStyle: 'none',
  marginTop: '10px',
};

const h4Style = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  fontSize: '20px',
  textAlign: 'center',
  paddingTop: '15px',
};

const pHowtoStyle = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  fontSize: '17px',
};

//policy
const policyStyle = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  border: '2px solid orange',
  borderRadius: '.625em',
  padding: '1em',
  fontSize: '21px',
  position: 'relative',
  width: '80%',
  maxWidth: '1075px',
  margin: '3em auto 1em',
  transition: 'font-size .5s',
  marginBottom: '50px',
};

const fontStyle = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
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
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  // padding: '10px 35px 35px',
  textAlign: 'center',
  display: 'block',
  padding: '5em 0',
  marginBottom: '50px',
  // marginTop: '50px',
  background: '-webkit-linear-gradient(-45deg, #FFB549 0%, #FDD086 100%)',
  background: 'linear-gradient(135deg, #FFB549 0%, #FDD086 100%)',
  // backgroundColor: '#f7f7f7'
};

const ulStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

const titleStyle = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  fontSize: '36px',
  fontWeight: 'bold',
  letterSpacing: '.1px',
  textAlign: 'center',
  lineHeight: '38px',
  paddingBottom: '30px',
  marginTop: '5px',
};

const h2Style = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '26px',
  letterSpacing: '.1px',
  textAlign: 'center',
  lineHeight: '20px',
  marginBlockEnd: '19.92px',
  marginBlockStart: '19.92px',
  paddingTop: '20px',
};

const pStyle = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  color: '#000',
  fontSize: '20px',
  textAlign: 'Center',
  letterSpacing: '.1px',
  lineHeight: '26px',
  marginBlockEnd: '16px',
  marginBlockStart: '16px',
};

const linkStyle = {
  width: '100%',
  textAlign: 'center',
};

const lostStyle2 = {
  fontFamily: 'Kanit',
  src: '../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  textAlign: 'center',
};

export default Index;
