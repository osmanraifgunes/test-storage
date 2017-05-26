var request = require('supertest');
var should = require('should');

var app = require('../../../../server.js');
var authHelper = require('../../auth-helper.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/testcases', function () {

    it('login', function (done) {
        this.timeout(35000);
        authHelper.authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /testcases respond with status 201 and JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send({
                'testSuiteId': '45069c63096d72f89cbf9205d27c985b',
                'priority': 1,
                'order': 2,
                'preConditions': 'Preconditions 1',
                'title': 'Testcase 1',
                'description': 'Test case description',
                'steps': ['Check that', 'Check this'],
                'testData': ['data1', 'data2'],
                'expected': ['Expected that', 'Expected this'],
                'postConditions': 'Postconditions 1',
                'tags': ['first tag', 'second tag'],
                'estimate': 10
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                // Location header
                res.header.location = res.body._id;
            })
            .end(function (err, res) {
                entityId = res.body._id;
                if (err) return done(err);
                done();
            });
    });

    it('GET /testcases/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                // res.body.should.have.property('_id');
                res.body.should.have.property('testSuiteId', '45069c63096d72f89cbf9205d27c985b');
                res.body.should.have.property('priority', 1);
                res.body.should.have.property('order', 2);
                res.body.should.have.property('preConditions', 'Preconditions 1');
                res.body.should.have.property('title', 'Testcase 1');
                res.body.should.have.property('description', 'Test case description');
                res.body.should.have.property('steps', ['Check that', 'Check this']);
                res.body.should.have.property('testData', ['data1', 'data2']);
                res.body.should.have.property('expected', ['Expected that', 'Expected this']);
                res.body.should.have.property('postConditions', 'Postconditions 1');
                res.body.should.have.property('tags', ['first tag', 'second tag']);
                res.body.should.have.property('estimate', 10);
                res.body.should.have.property('status', 'created');
                if (err) return done(err);
                done();
            });
    });

    it('GET /testcases respond with JSON', function (done) {
        request(server.app)
            .get('/api/v1/testcases')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                //res.body[0].should.have.property('_id');
                res.body[0].should.have.property('testSuiteId');
                res.body[0].should.have.property('priority');
                res.body[0].should.have.property('order');
                res.body[0].should.have.property('preConditions');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('steps');
                res.body[0].should.have.property('testData');
                res.body[0].should.have.property('expected');
                res.body[0].should.have.property('postConditions');
                res.body[0].should.have.property('tags');
                res.body[0].should.have.property('estimate');
                res.body[0].should.have.property('status');
                if (err) return done(err);
                if (err) return done(err);
                done();
            });
    });

    it('PUT /testcases respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .put('/api/v1/testcases/' + entityId)
            .set('x-access-token', token)
            .send({
                'testSuiteId': '11111c63096d72f89cbf9205d27c985b',
                'priority': 2,
                'order': 3,
                'preConditions': 'Preconditions 1 edited',
                'title': 'Testcase 1 edited',
                'description': 'Test case description edited',
                'steps': ['Check that edited', 'Check this edited'],
                'testData': ['data1 edited', 'data2 edited'],
                'expected': ['Expected that edited', 'Expected this edited'],
                'postConditions': 'Postconditions 1 edited',
                'tags': ['first tag edited', 'second tag edited'],
                'estimate': 15,
                'status': 'approved'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                //res.body.should.have.property('_id');
                res.body.should.have.property('testSuiteId', '11111c63096d72f89cbf9205d27c985b');
                res.body.should.have.property('priority', 2);
                res.body.should.have.property('order', 3);
                res.body.should.have.property('preConditions', 'Preconditions 1 edited');
                res.body.should.have.property('title', 'Testcase 1 edited');
                res.body.should.have.property('description', 'Test case description edited');
                res.body.should.have.property('steps', ['Check that edited', 'Check this edited']);
                res.body.should.have.property('testData', ['data1 edited', 'data2 edited']);
                res.body.should.have.property('expected', ['Expected that edited', 'Expected this edited']);
                res.body.should.have.property('postConditions', 'Postconditions 1 edited');
                res.body.should.have.property('tags', ['first tag edited', 'second tag edited']);
                res.body.should.have.property('estimate', 15);
                res.body.should.have.property('status', 'approved');
                if (err) return done(err);
                done();
            });
    });


    it('DELETE /testcases/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .delete('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function (err, res) {
                //res.body.should.not.have.property('_id');
                res.body.should.not.have.property('testSuiteId');
                res.body.should.not.have.property('priority');
                res.body.should.not.have.property('order');
                res.body.should.not.have.property('preConditions');
                res.body.should.not.have.property('title');
                res.body.should.not.have.property('description');
                res.body.should.not.have.property('steps');
                res.body.should.not.have.property('testData');
                res.body.should.not.have.property('tags');
                res.body.should.not.have.property('expected');
                res.body.should.not.have.property('postConditions');
                res.body.should.not.have.property('status');
                if (err) return done(err);
                done();
            });
    });

});
