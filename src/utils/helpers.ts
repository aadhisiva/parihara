export function daysCalFromDate(date: string) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date);
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
    return diffDays+'';
};