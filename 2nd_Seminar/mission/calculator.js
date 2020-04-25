function add(a, b) {
    console.log(`${a} + ${b} =  ${a + b}`);
}

function subtract(a, b){
    console.log(`${a} - ${b} =  ${a - b}`);
}

function multiply(a, b){
    console.log(`${a} * ${b} =  ${a * b}`);
}

function divide(a, b){
    if (b != 0){
        console.log(`${a} / ${b} =  ${a / b}`);
    }
    else{
        console.log('0으로 나눌 수 없습니다.');
    }
}

module.exports = {
    add, subtract, multiply, divide
}