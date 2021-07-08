# React Segement integration

The Segment.io Javascript snippet is meant for a wide variety of JavaScript apps and does not assume that you are using
a single-page app framework like React. Although the official tutorial works, this is library makes the integration far
more seamless.

Note: This package does not work for Analytics.js 2.0, it only works for Analytics.js Classic.

Simply add the `AnalyticsProvider` to you app with your write key:
```javascript
import { AnalyticsProvider } from './index.js'


function App() {
  return (
    <AnalyticsProvider writeKey="hejsvejs">
      <Component />
    </AnalyticsProvider>
  )
};
```

And you can access the analytics API with the useAnalytics hook:
```javascript
import { useAnalytics } from './index.js'


function Component() {
  analytics = useAnalytics()
  
  // Track the page load
  useEffect(() => {
    analytics.page()
  }, [])
  
  return (
    <Something />
  )
};
```

### Install
```bash
npm install --save git+git+https://github.com/AlbinLindskog/react-segment.git
```

### Testing
Run all tests:
```bash
npm test
```
Run a specific tests:
```bash
npm test -- -t 'the tests description string'
```
