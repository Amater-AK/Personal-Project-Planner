interface Props {
    message?: string;
}

export function InputError({ message }: Props) {
    return message ? <p className="text-sm text-danger">{message}</p> : null;
}
