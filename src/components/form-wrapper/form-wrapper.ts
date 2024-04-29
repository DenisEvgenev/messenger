import Block from 'core/Block';

type Props = {
    FormBody?: Block<object>;
    events?: {
        submit: (e: Event) => void;
    }
}

export default class FormWrapper extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: (e: Event) => {
                    console.log('===== Параметры =====', { ...props.FormBody?.props });
                    e.preventDefault();
                },
            },
        });
    }

    render() {
        return `
            <form class="container">
                {{{ FormBody }}}
            </form>
        `;
    }
}
