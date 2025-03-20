let lr = 0.1

class Perceptron{
    weights = [0,0];

    
    constructor(parameters){
        this.weights.forEach(i =>{
            this.weights[i] = random(-1,1);
        })
    }

    guess(input){
        let sum = 0;

        this.weights.forEach((weight, i) =>{
            sum += weight*input[i];
        });

        return sing(sum);
    }

}

function sing(num) {
    return num >= 0 ? +1 : -1;
}