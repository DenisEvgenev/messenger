import Block from 'core/Block';

export type Props = {
    type: string;
    events: {
        blur: (event: Event) => void;
    },
    className?: string;
    name: string;
}

class Input extends Block<Props> {
    render(): string {
        return `
            <input
                class="input__element{{#if className}} input__{{ className }}{{/if}}"
                type={{type}}
                name={{name}}
                placeholder=""
            />
        `;
    }
}

export default Input;
