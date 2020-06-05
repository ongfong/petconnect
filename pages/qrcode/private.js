import Layout from '../../components/Layout';

import Contact from '../../components/Map/contact';

const Private = () => {
  return (
    <Layout>
      <h2 style={h2Style}>ช่วยนำสัตว์ไปส่งที่สถานีตำรวจ ขอบคุณค่ะ/ครับ</h2>
      <Contact />
    </Layout>
  );
};

const h2Style = {
  fontWeight: 'bold',
  fontSize: '40px',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(-135deg, rgb(255, 217, 84), rgb(242, 171, 57))',
};

export default Private;
