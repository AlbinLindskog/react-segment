import React from 'react';

import { fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { useAnalytics, AnalyticsProvider } from './index.js'


test('Correct script injected', () => {
  const wrapper = ({ children }) => <AnalyticsProvider writeKey="hejsvejs">{children}</AnalyticsProvider>
  const { result } = renderHook(() => useAnalytics(), { wrapper });

  const script = document.querySelector('script');
  expect(script).not.toBeNull();
  expect(script.getAttribute('src')).toEqual('https://cdn.segment.com/analytics.js/v1/hejsvejs/analytics.min.js');
});


test('Stub analytics until loaded', () => {
  const wrapper = ({ children }) => <AnalyticsProvider writeKey="hejsvejs">{children}</AnalyticsProvider>
  const { result } = renderHook(() => useAnalytics(), { wrapper });


  // Log an event, should not fail, even if the analytics can't load.
  act(() => {
    result.current.identify(12, {userName: "Test McTest"})
  });

  // And the event should be logged, ready to be picked up later.
  expect(result.current[0]).toStrictEqual([ 'identify', 12, { userName: 'Test McTest' } ])
});


test('Stub analytics if analytics are blocked', () => {
  const wrapper = ({ children }) => <AnalyticsProvider writeKey="hejsvejs">{children}</AnalyticsProvider>
  const { result } = renderHook(() => useAnalytics(), { wrapper });

  // fire the load event, even if the script isn't loaded:
  const script = document.querySelector('script');
  fireEvent.load(script);
  
  // Log an event, should not fail, even if the analytics has been blocked.
  act(() => {
    result.current.identify(12, {userName: "Test McTest"})
  });
  
  // And the event should be saved by the stubAnalytics
  expect(result.current[0]).toStrictEqual([ 'identify', 12, { userName: 'Test McTest' } ])
});

