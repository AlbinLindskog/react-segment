import React, { useState, createContext, useContext } from 'react';
import { useScript, useDeepCompareMemo } from 'react-hooks';


// The analytics script is loaded asynchronously, so we define this stub analytics object
// with placeholders for the methods in Analytics.js, so you don't have to wait for it to
// load before recording data. The data is stored and replayed once the script loads.
// Taken from segment snippet v.4.13.2.

let stubAnalytics = [];

stubAnalytics.methods = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'page',
  'once',
  'off',
  'on'
];

stubAnalytics.factory = function(method){
  return function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift(method);
    stubAnalytics.push(args);
    return stubAnalytics;
  };
};

for (var i = 0; i < stubAnalytics.methods.length; i++) {
  var key = stubAnalytics.methods[i];
  stubAnalytics[key] = stubAnalytics.factory(key);
}


export const AnalyticsContext = createContext();


export const AnalyticsProvider = ({ writeKey, children }) => {
  /*
    An Context Provider which injects the Analytics.js script in
    the page head, and creates a context with the analytics object,
  */
  const [analytics, setAnalytics] = useState(stubAnalytics)
  const onLoad = () => setAnalytics(window.analytics)
  useScript("https://cdn.segment.com/analytics.js/v1/" + writeKey + "/analytics.min.js", onLoad);

  return (
    <AnalyticsContext.Provider value={{ analytics }}>
      {children}
    </AnalyticsContext.Provider>
  )
};


export const useAnalytics = () => {
  /*
   Hook that allows you to access the analytics object in function components.
  */
  const context = useContext(AnalyticsContext);

  if (context === undefined) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  }

  return context.analytics
};