var canvas = document.getElementById("canvas2");
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        class CircleAnimation{
            constructor(maxSize, scaling, arcSize, x, y, color, particleAmount){
                this.x = x;
                this.y = y;
                this.maxSize = maxSize;
                this.scaling = scaling;
                this.arcSize = arcSize;
                this.color = color;
                this.particleAmount = particleAmount;
                this.particles = [];
                for(let i = 0; i < this.particleAmount; i++){
                    this.particles.push(new CircleAnimation(10, 0.1, 0, this.x, this.y, this.color, 0));
                }
                this.particleDir = {};
                this.particleDir.x = this.getRandomNumber(-1,1);
                this.particleDir.y = this.getRandomNumber(-1,1);
            }
            draw(){
                if(this.arcSize < this.maxSize){
                    ctx.beginPath();
                    ctx.lineWidth = 0;
                    ctx.arc(this.x, this.y, this.arcSize, 0, 2 * Math.PI);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    ctx.stroke();
                    this.arcSize += this.scaling;
                    this.particledraw();
                }
            }
            particledraw(){
                this.particles.forEach(element => {
                    element.adddir();
                    element.draw();
                });
            }
            getRandomNumber(min,max){
                return Math.random()*(max-min) + min;
            }
            alphaset(){
                let lerp = 0;
                color.a = lerp;
            }
            adddir(){
                this.x += this.particleDir;
                this.y += this.particleDir;
            }
        }

        let a = [];

        update();

        function update(){
            requestAnimationFrame(update);
            for(let i = 0; i < a.length; i++){
                a[i].draw();
            }
            if(a.length > 10){
                a.splice(a.length, 1)
            }
        }

        function drawnewpoint(event){
            let r = getRandomNumber(0, 255);
            let g = getRandomNumber(0, 255);
            let b = getRandomNumber(0, 255);
            a.push(new CircleAnimation(window.innerWidth + window.innerWidth/2, 50, 10, event.clientX, event.clientY, "rgb("+r+","+g+","+b+")", 8));
        }

        function drawcenter(x,y){
            var colors = ["yellow", "white", "lightblue", "lime", "pink", "magenta", "brown", "cyan", "midnightblue", "crimson", "maroon", "navy", "teal", "fuchsia", "aquamarine", "peachpuff", "indigo", "papayawhip", "lightgoldenrodyellow", "cornflowerblue", "ivory", "darkkhaki", "gold", "lavender", "mediumvioletred", "firebrick", "saddlebrown", "salmon", "darkslategrey"]
            a.push(new CircleAnimation(window.innerWidth + window.innerWidth/2, 50, 10, x, y, colors[Math.floor(getRandomNumber(0, colors.length))], 8));
        }

        function getRandomNumber(min,max){
            return Math.floor(Math.random()*(max-min) + min);
        }
        window.addEventListener("click", drawnewpoint);