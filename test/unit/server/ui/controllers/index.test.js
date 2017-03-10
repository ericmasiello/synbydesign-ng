import supertest from 'supertest';
import nock from 'nock';
import cheerio from 'cheerio';
import app from '../../../../../src/server';
import { SYN_BY_DESIGN_ROUTE } from '../../../../../src/config';

describe('routes', function () {
  let request;
  const stub = {
    portfolio: [{
      title: 'The title',
    }],
    about: 'Learn about me',
  };
  beforeEach(() => {
    nock(SYN_BY_DESIGN_ROUTE)
      .get('/portfolio.json')
      .reply(200, JSON.stringify(stub.portfolio));

    nock(SYN_BY_DESIGN_ROUTE)
      .get('/about.json')
      .reply(200, JSON.stringify(stub.about));

    request = supertest(app)
      .get('/')
      .set('User-Agent', 'my cool browser')
      .set('Accept', 'test/plain');
  });

  it('should render div#app', function (done) {
    request
      .expect(200)
      .expect(function (res) {
        const $ = cheerio.load(res.text);
        expect($('#app')).toHaveLength(1);
      })
      .end(done);
  });

  it('should render a script tag with redux state', function (done) {
    request
      .expect(200)
      .expect(function (res) {
        const $ = cheerio.load(res.text);
        expect($('script').text().includes('window.__PRELOADED_DATA__')).toBeTruthy();
      })
      .end(done);
  });
});
