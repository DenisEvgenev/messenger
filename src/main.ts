import * as Handlebars from 'handlebars';
import Router from 'core/Router';
import Store from 'core/Store';
import * as Components from './components';
import * as Pages from './pages';

const router = new Router('#app');
declare global {
    interface Window {
      router: Router;
      store: Store;
    }
  }

window.router = router;

const store = new Store({
    isLoading: false,
    loginError: null,
    cats: [],
    user: null,
    selectedCard: null,
});

window.store = store;

Object.entries(Components).forEach(([name, component]) => {
    const template = component as unknown as Handlebars.Template<any>;
    Handlebars.registerPartial(name, template);
});

router
    .use('/', Pages.LoginPage)
    .use('/sign-up', Pages.SignInPage)
    .use('/settings', Pages.ProfilePage)
    .use('/profile-edit', Pages.ProfileEditPage)
    .use('/profile-password', Pages.ProfilePasswordPage)
    .use('/messenger', Pages.ChatPage)
    .use('*', Pages.ClientErrorPage)
    .use('/500', Pages.ServerErrorPage)
    .start();
