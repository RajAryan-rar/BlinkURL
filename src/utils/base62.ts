const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export  function toBase62(num : number) : string {
    if(num == 0) return '0';

    let result = '';

    while(num > 0) {
        result = BASE62_CHARS[num % 62] + result;
        num = Math.floor(num/62);
    }

    return result;
}

export function fromBase62(str: string): number {
    let result = 0;

    for (let i = 0; i < str.length; i++) {
        const value = BASE62_CHARS.indexOf(str[i]);
        result = result * 62 + value;
    }

    return result;
}