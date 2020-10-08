import axios from 'axios';

export default ({ req }) =>{
    if (typeof window === 'undefined'){
        //estamos en el server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    }else{
        //estamos en el navegador
        return axios.create({
           baseURL: '/'
        });
    }
};