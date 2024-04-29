import Block from 'core/Block';

export type Group = {
    className?: string;
    type: string;
    label: string;
    text: string;
    name: string;
}
export default class FormGroup extends Block<Group> {
    render() {
        return (`
            <div class="form-group">
                <label class="form-group__label">{{label}}</label>
                <input
                type="{{type}}"
                class="form-group__input {{classname}}"
                value="{{text}}"
                name="{{name}}"
                />
            </div>
        `);
    }
}
