import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import API from '../index';
import ApiConfig from 'config/api';

describe('fetch api tests', function () {
  describe('constructor tests', function () {
    it('constructor with nothing', function (done) {
      const api = new API();
      expect(api._config).to.be.eql({});
      done();
    });
    it('constructor with string', function (done) {
      const api = new API('auth');
      expect(api._config.site).to.be.equal('auth');
      done();
    });
    it('constructor with object', function (done) {
      const props = {site: 'auth', base: 'interfaces/v2'};
      const api = new API(props);
      // object
      expect(api._config).to.be.eql(props);
      done();
    });
  });
  describe('setter tests', function () {
    it('setters', function (done) {
      const api = new API();
      api.setBase('base');
      api.setSite('site');
      api.setUrlPrefix('urlPrefix');
      expect(api._config.base).to.be.equal('base');
      expect(api._config.site).to.be.equal('site');
      expect(api._config.urlPrefix).to.be.equal('urlPrefix');
      done();
    });
  });
  describe('URL ApiConfig tests', function () {
    it('use ApiConfig[site]', function (done) {
      const api = new API('auth');
      const returnUrl = api._makeURL('', {}, 'GET');
      expect(returnUrl).to.be.include(ApiConfig.auth);
      done();
    });
    it('use default ApiConfig.base', function (done) {
      const api = new API();
      const returnUrl = api._makeURL('', {}, 'GET');
      expect(returnUrl).to.be.include(ApiConfig.base);
      done();
    })
  });
  describe('generate url tests', function() {
    it('replace {param} with value', function (done) {
      const api = new API();
      const url = "/id/{id}/name/{name}";
      const params = {
        id: 123,
        name: '456'
      };
      const returnUrl = api._makeURL(url, params, 'GET');
      expect(returnUrl).to.be.include('/id/123/name/456');
      done();
    });
    it('append the rest of the params after url', function (done) {
      const api = new API();
      const url = "/id/{id}/name/{name}";
      const params = {
        id: 123,
        name: '456',
        pwd: 'test123',
        pwd2: 'test456'
      };
      const returnUrl = api._makeURL(url, params, 'GET');
      expect(returnUrl).to.be.include('/id/123/name/456?pwd=test123&pwd2=test456');
      done();
    });
    it('append the rest of the params after url when url include "?"', function (done) {
      const api = new API();
      const url = "/id/{id}/name/{name}?a=123";
      const params = {
        id: 123,
        name: '456',
        pwd: 'test123',
        pwd2: 'test456'
      };
      const returnUrl = api._makeURL(url, params, 'GET');
      expect(returnUrl).to.be.include('/id/123/name/456?a=123&pwd=test123&pwd2=test456');
      done();
    })
  });
});
