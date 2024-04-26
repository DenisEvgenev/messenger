import Block from 'core/Block';

export default class Icon extends Block {
    constructor(props) {
        super({ ...props });
    }

    render() {
        return (`
            <img src="{{src}}" class="icon icon__{{size}}" />
        `);
    }
}
