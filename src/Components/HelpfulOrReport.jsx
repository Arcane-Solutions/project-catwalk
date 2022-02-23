import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function helpfulOrReport({ type, path, id }) {
  // type: helpful or report, path reviews or questions
  return axios({
    url: `shopdata/${path}/${id}/${type}`,
    method: 'put',
  });
}

function Helpful({ path, id, handleRefresh }) {
  const options = {
    type: 'helpful',
    path,
    id,
  };

  return (
    <button
      data-analytics-id="helpful"
      type="button"
      onClick={() => {
        helpfulOrReport(options)
          .then((res) => {
            handleRefresh();
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >Yes
    </button>
  );
}

Helpful.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

function Report({ path, id, handleRefresh }) {
  const options = {
    type: 'report',
    path,
    id,
  };

  return (
    <button
      data-analytics-id="report"
      type="button"
      onClick={() => {
        helpfulOrReport(options)
          .then((res) => {
            handleRefresh();
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >Report
    </button>
  );
}

Report.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export { Helpful, Report };
