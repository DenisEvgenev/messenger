export default (time?: string) =>
    (time ? `${new Date(time).getHours().toString().padStart(2, '0')}:`
                + `${new Date(time).getMinutes().toString().padStart(2, '0')}`
        : '');
