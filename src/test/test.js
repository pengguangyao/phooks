const a = 0;
const b = a == 0 ? 2 : 1;

function sum() {
    return [...arguments].reduce((a, b) => a + b);
}

console.log(sum(a, b));

export default {
    sum,
};
