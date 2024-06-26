import { Title } from 'components/title';
import { Input } from 'components/input';
import { Button } from 'components/button';
import Block from 'core/Block';
import {
    REGEXP_LOGIN, REGEXP_PASSWORD, REGEXP_NAME, REGEXP_MAIL, REGEXP_PHONE,
} from 'constants/constants';
import {
    fillEmail, fillFirstName, fillLogin, fillPassword, fillPhone, fillSecondName,
} from 'services/setAutorizationFields';

type Props = {
    passwordSecond: string;
    loginField: string;
    passwordField: string;
    firstNameField: string;
    secondNameField: string;
    emailField: string;
    phoneField: string;
}

export default class FormSignIn extends Block<Props> {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeNameBind = this.onChangeName.bind(this);
        const onChangeLastNameBind = this.onChangeLastName.bind(this);
        const onChangeMailBind = this.onChangeMail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onChangePasswordSecondBind = this.onChangePasswordSecond.bind(this);
        const onRegisterBind = this.onRegister.bind(this);

        const TitleRegister = new Title({ title: 'Регистрация' });
        const InputMail = new Input({
            name: 'email', type: 'email', label: 'Почта', onBlur: onChangeMailBind,
        });
        const InputLogin = new Input({
            name: 'login', type: 'text', label: 'Логин', onBlur: onChangeLoginBind,
        });
        const InputName = new Input({
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            onBlur: onChangeNameBind,
        });
        const InputLastName = new Input({
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            onBlur: onChangeLastNameBind,
        });
        const InputPhone = new Input({
            name: 'phone',
            type: 'tel',
            label: 'Телефон',
            onBlur: onChangePhoneBind,
        });
        const FormPassword = new Input({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            onBlur: onChangePasswordBind,
        });
        const FormPasswordSecond = new Input({
            name: 'password',
            type: 'password',
            label: 'Пароль ещё раз',
            onBlur: onChangePasswordSecondBind,
        });

        const ButtonRegister = new Button({
            label: 'Зарегистрироваться',
            type: 'submit',
            onClick: onRegisterBind,
        });
        const ButtonLogin = new Button({
            label: 'Войти',
            type: 'link',
            page: '/',
        });

        this.children = {
            ...this.children,
            ButtonRegister,
            ButtonLogin,
            InputLogin,
            FormPassword,
            InputMail,
            InputName,
            InputLastName,
            InputPhone,
            FormPasswordSecond,
            TitleRegister,
        };
    }

    onChangeName(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_NAME.test(target.value)) {
            this.children.InputName.setProps({ error: false, errorText: null });
        } else {
            this.children.InputName.setProps({
                error: true,
                errorText: 'Имя должно быть латиницей или кириллицей, первая буква '
                + 'должна быть заглавной, без пробелов и без цифр, нет спецсимволов',
            });
        }

        fillFirstName(inputValue);
    }

    onChangeLastName(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_NAME.test(target.value)) {
            this.children.InputLastName.setProps({ error: false, errorText: null });
        } else {
            this.children.InputLastName.setProps({
                error: true,
                errorText: 'Фамилия должна быть латиницей или кириллицей, первая буква '
                + 'должна быть заглавной, без пробелов и без цифр, нет спецсимволов',
            });
        }

        fillSecondName(inputValue);
    }

    onChangeMail(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_MAIL.test(target.value)) {
            this.children.InputMail.setProps({ error: false, errorText: null });
        } else {
            this.children.InputMail.setProps({
                error: true,
                errorText: 'Почта должна иметь следующий вид: латиница, может включать '
                + 'цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна '
                + 'быть «собака» (@) и точка после неё, но перед точкой обязательно '
                + 'должны быть буквы.',
            });
        }

        fillEmail(inputValue);
    }

    onChangePhone(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PHONE.test(target.value)) {
            this.children.InputPhone.setProps({ error: false, errorText: null });
        } else {
            this.children.InputPhone.setProps({
                error: true,
                errorText: 'Номер телефона должен быть от 10 до 15 символов, '
                + 'состоять из цифр, может начинается с плюса.',
            });
        }

        fillPhone(inputValue);
    }

    onChangeLogin(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_LOGIN.test(target.value)) {
            this.children.InputLogin.setProps({ error: false, errorText: null });
        } else {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        fillLogin(inputValue);
    }

    onChangePassword(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PASSWORD.test(target.value)) {
            this.children.FormPassword.setProps({ error: false, errorText: null });
        } else {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
        }

        fillPassword(inputValue);
    }

    onChangePasswordSecond(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PASSWORD.test(target.value)) {
            this.children.FormPasswordSecond.setProps({ error: false, errorText: null });
        } else {
            this.children.FormPasswordSecond.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра'
                + ' и пароли должны совпадать',
            });
        }

        this.setProps({ ...this.props, passwordSecond: inputValue });
    }

    onRegister() {
        const isCorrectLogin = REGEXP_LOGIN.test(this.props.loginField || '');
        const isCorrectName = REGEXP_NAME.test(this.props.firstNameField || '');
        const isCorrectLastName = REGEXP_NAME.test(this.props.secondNameField || '');
        const isCorrectMail = REGEXP_MAIL.test(this.props.emailField || '');
        const isCorrectPhone = REGEXP_PHONE.test(this.props.phoneField || '');
        const isCorrectPassword = REGEXP_PASSWORD.test(this.props.passwordField || '')
            && this.props.passwordSecond === this.props.passwordField;

        if (!isCorrectPassword) {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
            this.children.FormPasswordSecond.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра'
                + ' и пароли должны совпадать',
            });
        }

        if (!isCorrectLogin) {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectName) {
            this.children.InputName.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectLastName) {
            this.children.InputLastName.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectMail) {
            this.children.InputMail.setProps({
                error: true,
                errorText: 'Почта должна иметь следующий вид: латиница, может включать '
                + 'цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна '
                + 'быть «собака» (@) и точка после неё, но перед точкой обязательно '
                + 'должны быть буквы.',
            });
        }

        if (!isCorrectPhone) {
            this.children.InputPhone.setProps({
                error: true,
                errorText: 'Номер телефона должен быть от 10 до 15 символов, '
                + 'состоять из цифр, может начинается с плюса.',
            });
        }
    }

    render() {
        return (`
            <div class="sign-in-form">
                {{{ Title }}}
                {{{ InputMail }}}
                {{{ InputLogin }}}
                {{{ InputName }}}
                {{{ InputLastName }}}
                {{{ InputPhone }}}
                {{{ FormPassword }}}
                {{{ FormPasswordSecond }}}
                {{{ ButtonRegister }}}
                {{{ ButtonLogin }}}
            </div>
        `);
    }
}
