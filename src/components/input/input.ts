import Block from '../../core/Block';

class Input extends Block {
    constructor(props) {
        super(props);
    }

    render(): string {
        return `
            <input
                class="input__element input__{{ type }}"
                type={{type}}
                placeholder=""
            />
        `;
    }
}

export default Input;
