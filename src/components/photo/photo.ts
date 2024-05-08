import Block from 'core/Block';

const REGEXP_IMAGE_NAME = /[^/]*_([^/.]+)\.\w+$/;

type Props = {
    avatar: string;
    imageName?: string;
    srcAvatar?: string;
    events?: {
        click: () => void;
    },
    type?: string;
    className?: string;
}

export default class Photo extends Block<Props> {
    constructor(props: Props) {
        const imageName = props.avatar?.match(REGEXP_IMAGE_NAME)?.[1];

        super({
            ...props,
            imageName: imageName ?? 'Empty image',
        });
    }

    render() {
        return (`
            <img 
                alt="{{imageName}}" 
                src="{{avatar}}" 
                class="image image__{{type}} image__{{className}}" 
            />`
        );
    }
}
