import Block from 'core/Block';
import { UserDTO } from 'api/types';
import { Button } from 'components/button';

type Props = {
    userData?: UserDTO
    events?: {
        submit: (e: Event) => void;
    },
    onSubmit?: (e: Event) => void;
    showModal?: boolean;
}

class FormEditPhoto extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit || (() => {}),
            },
        });
    }

    init() {
        const ButtonSave = new Button({
            label: 'Сохранить',
            type: 'submit',
        });
        const ButtonCancel = new Button({
            label: 'Закрыть',
            type: 'link',
            page: '/profile-edit',
            onClick: () => this.setProps({ showModal: false }),
        });

        this.children = {
            ...this.children,
            ButtonSave,
            ButtonCancel,
        };
    }

    render() {
        return (
            `
            <div class="form-edit-photo {{#if showModal}}form-edit-photo__show{{/if}}">
                <div class="form-edit-photo__container">
                    <form id="myUserForm" class="form-edit-photo__form">
                        Картинка: <input id="avatar" type="file" name="avatar" accept="image/*">
                        {{{ ButtonSave }}}
                    </form>
                    {{{ ButtonCancel }}}
                </div>
            </div>
            `
        );
    }
}

export default FormEditPhoto;
