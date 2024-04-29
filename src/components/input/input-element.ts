import Block from 'core/Block';
import ErrorLine from './error-line';
import Input from './input';

type Props = {
    type: 'password' | 'text' | 'email' | 'tel';
    label: string;
    onBlur?: () => void;
    error?: string;
    className?: string;
}

class InputElement extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    init() {
        const InputBlock = new Input({
            ...this.props,
            type: this.props.type,
            events: {
                blur: this.props.onBlur || (() => {}),
            },
        });

        const ErrorLineBlock = new ErrorLine();

        this.children = {
            ...this.children,
            InputBlock,
            ErrorLineBlock,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps === newProps) {
            return false;
        }

        this.children.ErrorLineBlock.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input{{#if error}} input__error{{/if}}" >
            <label class="input__container">
                {{{ InputBlock }}}
                <div class="input__label input__label-{{type}}">{{label}}</div>
            </label>
            {{{ ErrorLineBlock }}}
        </div>
    `;
    }
}

export default InputElement;
