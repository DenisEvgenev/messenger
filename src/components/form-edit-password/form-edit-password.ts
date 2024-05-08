import { Button, FormGroup } from 'components';
import Block from 'core/Block';
import { UserDTO } from 'api/types';
import { fillNewPassword, fillOldPassword } from 'services/setEditFields';

type Props = {
    userData?: UserDTO
    events?: {
        submit: (e: Event) => void;
    },
    onSubmit: (e: Event) => void
}
class FormEditPassword extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit,
            },
        });
    }

    init() {
        const FormGroupOldPassword = new FormGroup({
            className: 'form-group__input',
            type: 'password',
            label: 'Старый пароль',
            text: '',
            name: 'oldPassword',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillOldPassword(inputValue);
            },
        });

        const FormGroupNewPassword = new FormGroup({
            className: 'form-group__input',
            type: 'password',
            label: 'Новый пароль',
            text: '',
            name: 'newPassword',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillNewPassword(inputValue);
            },
        });
        const ButtonSave = new Button({
            label: 'Сохранить',
            type: 'submit',
            className: 'main',
            events: {
                click: () => {
                    const focusableElements = document.querySelectorAll('input');

                    focusableElements.forEach((element) => {
                        element.blur();
                    });
                },
            },
        });

        this.children = {
            ...this.children,
            FormGroupOldPassword,
            FormGroupNewPassword,
            ButtonSave,
        };
    }

    render() {
        return (
            `
            <form class="form-edit">
                {{{ FormGroupOldPassword }}}
                {{{ FormGroupNewPassword }}}
                <div class=form-edit__space></div>
                {{{ ButtonSave }}}
            </form>
            `
        );
    }
}

export default FormEditPassword;
