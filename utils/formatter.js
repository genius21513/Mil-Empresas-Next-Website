
export function strTruncate(str, n){
    // &hellip; == ...
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

export function ProfileUserName (str) {
    return str? str[0].toUpperCase(): 'Profile';
}