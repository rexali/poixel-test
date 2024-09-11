var expect = require('assert');
var supertest = require('supertest');
var app = require('./server');


describe('Test all the Poixel Solutions Endpoints', async () => {

    var request;


    var clientLoginData = {
        email: 'alybaba567@gmail.com',
        password: 'manmustwak',
    }

    beforeEach(function (done) {
        getJwtToken().then((result) => {
            request = supertest(app)
                .set("User-Agent", "Poixel Test Solution")
                .set("Accept", "application/json")
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + 1234567890);
        });
        done();
    });

    it('Register user, should return the user data', (done) => {

        request = supertest(app)
            .get('/auth/register')
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response body
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Registration successfull');
                expect.deepEqual(clientRegistrationData, data);
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
                expect.equal(message, 'Login successful');
                expect.deepEqual(clientLoginData, data)
            }).end(done)
    })


    it('Log in admin, should return a user or client data', (done) => {
        var adminRegistrationData = {
            name: 'alybaba567',
            email: 'alybaba567@gmail.com',
            password: 'manmustwak',
            businessType: "Fish Farming",
            role: "admin"
        }; // mock data
        request = supertest(app)
            .post('/auth/login')
            .send({ ...adminRegistrationData })
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Login successful');
                expect.deepEqual(clientLoginData, data);
                expect.equal("admin", data.role)
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
            .post('/admins/getclients')
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Clients found');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


    it('Delete a client, should return a client id', (done) => {

        let mock_data = { userId: 1 };

        request = supertest(app)
            .post('/admins/deleteclient')
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Delete successfull');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


    
    it('Update a client, should return a client id', (done) => {

        let mock_data = { userId: 1 };

        request = supertest(app)
            .post('/admins/deleteclient')
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Update successfull');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


})