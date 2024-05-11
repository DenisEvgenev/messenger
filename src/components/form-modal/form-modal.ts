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
    formBody?: string | Block<object>;
    title?: string;
}

class FormModal extends Block<Props> {
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
            <div class="form-modal {{#if showModal}}form-modal__show{{/if}}">
                <div class="form-modal__container">
                    <p class="form-modal_title">{{ title }}</p>
                    <form id="form-modal" class="form-modal__form">
                        {{{ formBody }}}
                        {{{ ButtonSave }}}
                    </form>
                    {{{ ButtonCancel }}}
                </div>
            </div>
            `
        );
    }
}

export default FormModal;
