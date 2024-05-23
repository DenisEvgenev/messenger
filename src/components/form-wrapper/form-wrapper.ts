import Block from 'core/Block';

type Props = {
    FormBody?: Block<object>;
    events?: {
        submit: (e: Event) => void;
    },
    onSubmit: (e: Event) => void
}

export default class FormWrapper extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit,
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
