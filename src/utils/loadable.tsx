import React, { lazy, Suspense, LazyExoticComponent, ComponentType, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, finishLoading } from '../store/loadingSlice';

export function loadable<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>  
): React.FC<any> {
  const Component = lazy(importFunc);
  return (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(startLoading());
      importFunc().finally(() => dispatch(finishLoading()));
    }, [dispatch]);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}