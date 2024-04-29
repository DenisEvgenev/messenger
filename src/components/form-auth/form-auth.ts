import { Input, Button, Title } from 'components';
import { REGEXP_LOGIN, REGEXP_PASSWORD } from 'constants/constants';
import Block from 'core/Block';

type Props = {
    login?: string;
    password?: string;
}

class FormAuth extends Block<Props> {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const TitleLogin = new Title({ title: 'Вход' });
        const InputLogin = new Input({ type: 'text', label: 'Логин', onBlur: onChangeLoginBind });
        const FormPassword = new Input({
            type: 'password',
            label: 'Пароль',
            onBlur: onChangePasswordBind,
        });
        const ButtonLogin = new Button({
            label: 'Авторизироваться',
            type: 'submit',
            disabled: true,
            events: {
                click: onLoginBind || (() => {}),
            },
            page: 'chat',
        });
        const ButtonCreateAccount = new Button({
            label: 'Нет аккаунта?',
            type: 'link',
            page: 'sign-in',
        });

        this.children = {
            ...this.children,
            ButtonLogin,
            ButtonCreateAccount,
            InputLogin,
            FormPassword,
            TitleLogin,
        };
    }

    onChangeLogin(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_LOGIN.test(inputValue)) {
            this.children.InputLogin.setProps({ error: false, errorText: null });
        } else {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        this.setProps({ login: inputValue });
    }

    onChangePassword(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PASSWORD.test(inputValue)) {
            this.children.FormPassword.setProps({ error: false, errorText: null });
        } else {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
        }

        this.setProps({ password: inputValue });
    }

    onLogin() {
        const { login = '', password = '' } = this.props;
        const isCorrectLogin = REGEXP_LOGIN.test(login);
        const isCorrectPassword = REGEXP_PASSWORD.test(password);

        if (!isCorrectPassword) {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
        }

        if (!isCorrectLogin) {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        } else {
            this.children.InputLogin.setProps({ error: false, errorText: null });
        }

        if (isCorrectLogin && isCorrectPassword) {
            this.children.ButtonLogin.setProps({ disabled: false });
        } else {
            this.children.ButtonLogin.setProps({ disabled: true });
        }
        console.log('===== Параметры =====', {
            ...this.props,
        });
    }

    render() {
        return (`
            <div class="login-form">
                {{{ TitleLogin }}}
                {{{ InputLogin }}}
                {{{ FormPassword }}}
                {{{ ButtonLogin }}}
                {{{ ButtonCreateAccount }}}
            </div>
        `);
    }
}

export default FormAuth;
