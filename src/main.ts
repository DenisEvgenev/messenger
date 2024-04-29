import * as Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages: Record<string, any> = {
    login: [Pages.LoginPage],
    'sign-in': [Pages.SignInPage],
    chat: [Pages.ChatPage],
    404: [Pages.ClientErrorPage],
    500: [Pages.ServerErrorPage],
    profile: [Pages.ProfilePage],
    'profile-edit': [Pages.ProfileEditPage],
    'profile-password': [Pages.ProfilePasswordPage],
};

Object.entries(Components).forEach(([name, component]) => {
    const template = component as unknown as Handlebars.Template<any>;
    Handlebars.registerPartial(name, template);
});

export function navigate(page: string) {
    const [Source, context] = pages[page];
    const container = document.getElementById('app')!;

    if (Source instanceof Object) {
        const pageSource = new Source(context);
        container.innerHTML = '';
        container.append(pageSource.getContent());
        return;
    }

    container.innerHTML = Handlebars.compile(Source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('profile'));

document.addEventListener('click', (e) => {
    if (e.target && e.target instanceof HTMLElement) {
        const page = e.target.getAttribute('page');
        if (page) {
            navigate(page);
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }
});
