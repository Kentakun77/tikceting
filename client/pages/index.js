import buildClient from '../api/build-client';

const LandingPage = ({ currentUser })=>{
    return currentUser ? <h1>Estas logeado</h1> : <h1>No estas Logeado</h1>
};

LandingPage.getInitialProps = async (context) =>{
    console.log('LandingPage!!')
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');


    return data;
};

export default LandingPage;
