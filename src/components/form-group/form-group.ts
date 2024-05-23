import Block from 'core/Block';
import { FormGroupInput } from './form-group-input';

export type Group = {
    className?: string;
    type: string;
    label: string;
    text: string;
    name: string;
    onBlur?: (event: Event) => void;
    events?: {
        blur: (event: Event) => void;
    }

}
export default class FormGroup extends Block<Group> {
    init(): void {
        const FormGroupInputBlock = new FormGroupInput({
            type: this.props.type,
            className: this.props.className || '',
            text: this.props.text,
            name: this.props.name,
            events: {
                blur: this.props?.onBlur ?? (() => {}),
            },
        });

        this.children = {
            ...this.children,
            FormGroupInputBlock,
        };
    }

    componentDidUpdate(oldProps: Group, newProps: Group): boolean | { [x: string]: unknown; } {
        if (oldProps === newProps) {
            return false;
        }

        this.children.FormGroupInputBlock.setProps(newProps);

        return true;
    }

    render() {
        return (`
            <div class="form-group">
                <label class="form-group__label">{{label}}</label>
                {{{ FormGroupInputBlock }}}
            </div>
        `);
    }
}
