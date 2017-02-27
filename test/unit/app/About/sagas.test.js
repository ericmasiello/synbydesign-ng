import { expect } from 'chai';
import {
  call,
  put,
} from 'redux-saga/effects';
import fetchAbout from '../../../../src/app/About/sagas';
import Api from '../../../../src/app/api';
import {
  LOAD_ABOUT_SUCCEEDED,
  LOAD_ABOUT_FAILED,
} from '../../../../src/app/About/actions';

describe('About Sagas', function () {
  it('should work', function () {
    expect(true).to.equal(true);
  });

  it('should fetch about content', function () {
    const generator = fetchAbout();
    expect(generator.next().value).to.deep.equal(call(Api.fetchAbout));
    const aboutResponse = {
      content: 'Hello world',
    };
    expect(generator.next(aboutResponse).value).to.deep.equal(put({
      type: LOAD_ABOUT_SUCCEEDED,
      payload: 'Hello world',
    }));
  });

  it('should fail to fetch about content', function () {
    const generator = fetchAbout();
    expect(generator.next().value).to.deep.equal(call(Api.fetchAbout));
    const error = new Error('An error occurred');
    expect(generator.throw(error).value).to.deep.equal(put({
      type: LOAD_ABOUT_FAILED,
      message: 'An error occurred',
    }));
  });
});
