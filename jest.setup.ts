import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import jestFetchMock from "jest-fetch-mock";

configure({ adapter: new ReactSixteenAdapter() });
jestFetchMock.enableMocks();
