export function toDateTime(timestamp: number) {
    return new Date(timestamp).toLocaleString();
}

export function toDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString();
}
