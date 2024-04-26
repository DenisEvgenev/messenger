import Block from 'core/Block';

export default class FormGroup extends Block {
    constructor(props) {
        super({ ...props });
    }

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
