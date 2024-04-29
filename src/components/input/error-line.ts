import Block from 'core/Block';

export type Props = {
    errorText: string;
}

export default class ErrorLine extends Block<Props> {
    render(): string {
        return (`
            <div class="input__text-error">{{ errorText }}</div>
        `);
    }
}
