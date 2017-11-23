import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HomePage } from 'Mobile/pages';

const HomeContainer = props => <HomePage {...props} />;

HomeContainer.propTypes = {
  // isClientRendered: PropTypes.bool.isRequired
};

export default connect()(HomeContainer);
