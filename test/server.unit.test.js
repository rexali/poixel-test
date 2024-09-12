var expect = require('assert');
var supertest = require('supertest');
var app = require('./mock.server');


describe('Test all the Poixel Test Endpoints', async () => {

    var request;

    var clientLoginData = {
        email: 'alybaba567@gmail.com',
        password: 'manmustwak',
    }

    it('Register user, should return the user data', (done) => {

        let clientRegistrationData = {
            name: 'alybaba567',
            email: 'alybaba567@gmail.com',
            password: 'manmustwak',
            businessType: "Fish Farming"
        }; // mock data

        request = supertest(app)
        .post('/auth/register')
        .send(clientRegistrationData)
        .expect(function (res) {
                let { status, message, data } = res.body; // destructure response body
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Registration successfull');
                expect.equal(clientRegistrationData.businessType, data.businessType);
            }).end(done)
    })


    it('Log in user or client, should return a user or client data', (done) => {
        let clientRegistrationData = {
            name: 'alybaba567',
            email: 'alybaba567@gmail.com',
            password: 'manmustwak',
            businessType: "Fish Farming"
        }; // mock data
        request = supertest(app)
            .post('/auth/login')
            .send({ ...clientRegistrationData })
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Login successfull');
                expect.equal(clientLoginData.email, data.email)
            }).end(done)
    })


    it('Log in admin, should return admin data', (done) => {
        var adminLogInData = {
            email: 'alybaba567@gmail.com',
            password: 'manmustwak',
        }; // mock data
        request = supertest(app)
            .post('/auth/login')
            .send(adminLogInData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Login successfull');
                expect.equal(adminLogInData.email, data.email)
            }).end(done)
    })


    it('List all client, should return a list of registerd clients', (done) => {

        let mock_data = [{
            userId: 1,
            name: "Aliyu Bello",
            email: "alybaba2009@gmail.com",
            role: "user",
            businessType: "Fish Farming"
        }]

        request = supertest(app)
            .get('/admins/getclients')
            .send(mock_data)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Clients found');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


    it('Delete a client, should return a client id', (done) => {

        let clientData = { 
            userId: 1 
        };

        request = supertest(app)
            .delete('/admins/deleteclient')
            .send(clientData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Delete successfull');
                expect.equal(clientData.userId, data.userId);
            }).end(done)
    })



    it('Update a client, should return a client id', (done) => {

        let mock_data = { userId: 1 };

        request = supertest(app)
            .patch('/admins/updateclient')
            .send(mock_data)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Update successfull');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


})