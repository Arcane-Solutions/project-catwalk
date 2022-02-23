/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';


const analytics = [];

window.printAnalytics = () => {
  console.log(JSON.stringify(analytics, null, '  '));
};

const logAnalytics = (target, time, moduleName, stop = document.body) => {
  const key = [target.tagName];

  let node = target;
  while (node !== stop) {
    if (node.getAttribute('data-analytics-id')) {
      key.push(node.getAttribute('data-analytics-id'));
    }
    node = node.parentElement;
  }

  analytics.push([key.reverse().join(' '), time, moduleName]);
};

const withAnalytics = (WrappedComponent, moduleName) => function ComponentWithAnalytics(props) {
  const stop = useRef(undefined);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={stop}
      onClick={(e) => {
        logAnalytics(e.target, Date.now(), moduleName, stop.current);
      }}
    >
      <WrappedComponent {...props} />
    </div>
  );
};

export default withAnalytics;
