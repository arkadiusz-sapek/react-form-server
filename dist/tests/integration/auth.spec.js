"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../lib/app");
const mongoose = require("mongoose");
const chai = require("chai");
const ChaiHttp = require("chai-http");
describe('Auth', () => {
    chai.use(ChaiHttp);
    let should = chai.should();
    let userMock = {
        email: "user@user.com",
        password: "UserPassword1"
    };
    let badPasswordUserMock = {
        email: "user@user.com",
        password: "UserPassword2"
    };
    let badEmailUserMock = {
        email: "user2user.com",
        password: "UserPassword1"
    };
    before((done) => {
        mongoose.connect(process.env.CONNECTION_STRING_TEST, { useNewUrlParser: true }, () => {
            mongoose.connection.db.dropDatabase(() => {
                done();
            });
        });
    });
    describe('register and login user', () => {
        it('should post new user and revice token', (done) => {
            chai.request(app_1.default)
                .post('/api/register')
                .send(userMock)
                .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.have.property('auth');
                res.body.should.have.property('token');
                res.body.should.have.property('id');
                res.body.should.have.property('role');
                res.body.role.should.equal('user');
                done();
            });
        });
        it('should succesfuly log and receive token', (done) => {
            chai.request(app_1.default)
                .post('/api/login')
                .send(userMock)
                .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                res.body.should.have.property('auth');
                res.body.should.have.property('token');
                res.body.should.have.property('id');
                res.body.should.have.property('role');
                res.body.role.should.equal('user');
                done();
            });
        });
        it('should failed login for bad password', (done) => {
            chai.request(app_1.default)
                .post('/api/login')
                .send(badPasswordUserMock)
                .end((err, res) => {
                res.should.be.json;
                res.should.have.status(401);
                done();
            });
        });
        it('should failed login for bad email', (done) => {
            chai.request(app_1.default)
                .post('/api/login')
                .send(badEmailUserMock)
                .end((err, res) => {
                res.should.be.json;
                res.should.have.status(400);
                done();
            });
        });
    });
});
//# sourceMappingURL=auth.spec.js.map