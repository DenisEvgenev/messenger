import Block from 'core/Block';

type Props = {
    type: string;
    className: string;
    text: string;
    name: string;
    events?: {
        blur: (event: Event) => void;
    }
}

export default class FormGroupInput extends Block<Props> {
    render() {
        return (
            `
            <input
                type="{{type}}"
                class="form-group__input {{className}}"
                value="{{text}}"
                name="{{name}}"
            />
            `
        );
    }
}
