class Perceptron {
    weights;
    oldWeights;
    lr = 0.1;
    
    constructor(numberWeights) {
        this.weights = new Array(numberWeights);
        this.oldWeights = new Array(numberWeights);
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }
    }

    train(inputs, target) {
        const guess = this.guess(inputs);
        const error = target - guess;
        this.oldWeights = [...this.weights];

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * inputs[i] * this.lr;
        }
    }

    convergiu() {
        const tolerancia = 0.001;
        for (let i = 0; i < this.weights.length; i++) {
            if (Math.abs(this.weights[i] - this.oldWeights[i]) > tolerancia) {
                return false;
            }
        }
        return true;
    }

    guess(input) {
        let sum = 0;
        this.weights.forEach((weight, i) => {
            sum += weight * input[i];
        });
        return Math.sign(sum);
    }

    guessY(x) {
        const w0 = this.weights[0];
        const w1 = this.weights[1];
        const w2 = this.weights[2];
        return -(w2 / w1) - (w0 / w1) * x;
    }
}