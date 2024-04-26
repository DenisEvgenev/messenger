import Block, { Props } from '../../core/Block';
import ErrorLine from './error-line';
import Input from './input';

class InputElement extends Block {
    constructor(props) {
        super({
            ...props,
            Input: new Input({
                type: props.type,
                events: {
                    blur: props.onBlur || (() => {}),
                },
            }),
            ErrorLine: new ErrorLine(),
        });
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps === newProps) {
            return false;
        }

        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input {{#if error}}input__error{{/if}}" >
            <label class="input__container">
                {{{ Input }}}
                <div class="input__label input__label-{{type}}">{{label}}</div>
            </label>
            {{{ ErrorLine }}}
        </div>
    `;
    }
}

export default InputElement;
