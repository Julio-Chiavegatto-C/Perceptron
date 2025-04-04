let perceptron;
let training = true;
let guessRatio = true;

let points = new Array(100)

function setup(){
    perceptron = new Perceptron(3);
    createCanvas(550, 550);
    for(let i = 0; i < points.length;i++){
        points[i] = new Point(random(-1,1), random(-1,1));
    }
}

function draw(){
    background(255);
    for(let i = 0; i < points.length; i++){
        points[i].show();
    }

    noStroke();

    points.forEach(point =>{
        const inputs = [point.x, point.y, point.bias];
        const target = point.label;
        const guess = perceptron.guess(inputs);

        if(guess == target){
            fill(0,255,0);
        }
        else{
            fill(255, 0, 0);
        }

        ellipse(point.getPixelX(), point.getPixelY(), 15, 15);
    });

    drawLine();

    if (training) {
        trainSinglePoint();
        
        if (trainingIndex === 0) {
            let convergiu = true;
            const tolerancia = 0.001;            
            
            for (let i = 0; i < perceptron.weights.length; i++) {
                if (Math.abs(perceptron.weights[i] - perceptron.oldWeights[i]) > tolerancia) {
                    convergiu = false;
                    break;
                }
            }
            
            if (convergiu) {
                training = false;
                calcGuessRatio();
            }
        }
    }
}

function calcGuessRatio(){
    let testPoints = new Array(100);
    let correctGuesses = 0;

    for (let i = 0; i < testPoints.length; i++) {
        testPoints[i] = new Point(random(-1,1), random(-1,1));
        const inputs = [testPoints[i].x, testPoints[i].y, testPoints[i].bias];
        const guess = perceptron.guess(inputs);
        
        if(guess == testPoints[i].label){
            correctGuesses++;
        }
    }

    console.log(`Taxa de acertos: ${correctGuesses}%`);
    guessRatio = false;
}

function drawLine(){
    stroke(0);
    const p1 = new Point(-1, f(-1));
    const p2 = new Point(1, f(1));
    line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());
    
    stroke(0,0,255);
    const guessP1 = new Point(-1, perceptron.guessY(-1));
    const guessP2 = new Point(1, perceptron.guessY(1));
    line(guessP1.getPixelX(), guessP1.getPixelY(), guessP2.getPixelX(), guessP2.getPixelY());
}

let trainingIndex = 0;

function trainSinglePoint(){
    const pt = points[trainingIndex];
    const inputs = [pt.x, pt.y, pt.bias];
    perceptron.train(inputs,pt.label);
    trainingIndex++;

    if(trainingIndex == points.length){
        trainingIndex = 0;
    }
}