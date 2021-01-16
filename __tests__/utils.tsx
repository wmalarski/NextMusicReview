import { mount, MountRendererProps, ReactWrapper } from "enzyme";
import { NextRouter } from "next/router";
import React, { createElement, ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";

export async function waitForComponentToPaint<P>(
  wrapper: ReactWrapper<P, any>
): Promise<void> {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
}

export const nextRouterMock: () => NextRouter = () => ({
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(
    (path: string): Promise<boolean> => {
      console.log("path", path);
      return new Promise(() => true);
    }
  ),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false
});

export function withRouterContext<P>(
  Component: (props: P) => ReactElement<P>,
  initialProps: P,
  router?: NextRouter,
  options?: MountRendererProps
): ReactWrapper<P, any> {
  const queryClient = new QueryClient();
  const wrapper = mount(
    createElement(
      props => (
        // <RouterContext.Provider value={router ?? nextRouterMock()}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
        // </RouterContext.Provider>
      ),
      initialProps
    ),
    options ?? {}
  );
  return wrapper;
}
