import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';

const history = createHistory();
history.listen((location, action)=> {
    ReactGA.initialize('');
    ReactGA.pageview(location.pathname);
    console.log(location);
    console.log(action);
});

export default history;