import React, { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const handleAppEvent = (state) => {
      if (state !== appState) {
        setAppState(state);
      }
    };
    AppState.addEventListener('change', handleAppEvent);
    return () => {
      AppState.removeEventListener('change', handleAppEvent);
    };
  }, [appState]);
  return appState;
};

export const removeListener = (eventHandler) => {
  AppState.removeEventListener('change', eventHandler);
};

export const usePrevAppState = (appState) => {
  const appStateRef = useRef(appState);
  useEffect(() => {
    appStateRef.current = appState;
  });
  return appStateRef.current;
};

export default useAppState;
