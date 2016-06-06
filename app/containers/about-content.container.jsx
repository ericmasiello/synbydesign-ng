'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutContent from '../components/about-content.component';
import { loadAboutContent } from '../actions/about-content.action-creator';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

const mapStateToProps = ({aboutContent, loadedAboutContent}) => {
  return {
    aboutContent,
    loadedAboutContent
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadAboutContent
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutContent);
