import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE ?? "", {
    debug: true,
    titleCase: true,
});

const history = createHistory();
history.listen((location, action)=> {
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.ga('set', 'checkProtocolTask', null);
});

export default history;