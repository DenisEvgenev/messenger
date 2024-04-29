import Block from 'core/Block';

export type Props = {
    type: string;
    events: {
        blur: () => void;
    },
    className?: string;
}

class Input extends Block<Props> {
    render(): string {
        return `
            <input
                class="input__element{{#if className}} input__{{ className }}{{/if}}"
                type={{type}}
                placeholder=""
            />
        `;
    }
}

export default Input;
