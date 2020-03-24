import chai from 'chai';
import app from './../src/app';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should;

const handleError = error => {
  console.log(error);
  
  const message: string = (error.response) ? error.response.res.text : error.message || error;
  return Promise.reject(`${error.name}: ${message}`);
}

export {
  app,
  chai,
  expect,
  should,
  handleError
}