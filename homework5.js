const canvas = document.getElementById("canvas");
    const c = canvas.getContext("2d");
    var gameStatus = true;
    const goodGuyImg = new Image();
    goodGuyImg.src = "http://www.stickpng.com/assets/images/5a18871c8d421802430d2d05.png";
    const backgroundImg = new Image();
    backgroundImg.src = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/VGiBmTeaeilt7mgjb/video-game-background-blue_451fb1bpx__F0000.png";


    const rand = function(num) {
        return Math.floor(Math.random() * num);
    };


    document.addEventListener("keydown", function (event) {
        if(event.keyCode === 38) {
            gameData.hero.update("up");
        } else if(event.keyCode === 40) {
            gameData.hero.update("down");
        } else if(event.keyCode === 37) {
            gameData.hero.update("left");
        } else if(event.keyCode === 39) {
            gameData.hero.update("right");
        }

    });

    const gameData = {
        hero: {
            x: 0,
            y: 0,
            heroSpeed: 20,
            image: goodGuyImg,
            width: 50,
            height: 50,
            draw: function() {
                c.drawImage(this.image, this.x, this.y, this.width, this.height);
            },
            update: function(direction) {
                if(direction === "up") {
                    this.y -= this.heroSpeed;
                } else if(direction === "down") {
                    this.y += this.heroSpeed;
                } else if (direction === "left") {
                    this.x -= this.heroSpeed;
                } else if(direction === "right") {
                    this.x += this.heroSpeed;
                }
            }
        },
        badGuys: []
    };

    function badGuyOption() {
        const badGuyImg1 = new Image();
        badGuyImg1.src = "http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c314.png";
        const badGuyImg2 = new Image();
        badGuyImg2.src = "http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c31b.png";
        const badGuyImg3 = new Image();
        badGuyImg3.src = "http://www.pngmart.com/files/2/Pac-Man-Ghost-PNG-Image.png";
        const badGuyImg4 = new Image();
        badGuyImg4.src = "https://static.giantbomb.com/uploads/scale_small/8/87790/2469740-blinky.png";
        const badGuyImg5 = new Image();
        badGuyImg5.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Square-symbol.svg/2000px-Square-symbol.svg.png";
        const arr = [badGuyImg1, badGuyImg2, badGuyImg3, badGuyImg4, badGuyImg5];
        return arr[rand(arr.length)];
    }

    function createVillains(count, canvasWidth, canvasHeight){
        const width = 50;
        const height = 50;
        for(var i = 0; i < count; i++){
            var obj = {
                width: width,
                height: height,
                x: rand(30) + (canvasWidth - width * 4),
                y: rand(canvasHeight),
                xDelta: (Math.random() - 0.5) * 20,
                yDelta: (Math.random() - 0.5) * 20,
                image: badGuyOption(),
                draw: function () {
                    c.drawImage(this.image, this.x, this.y, this.width, this.height);
                },
                update: function () {
                    if(gameData.hero.x < this.x + this.width  && gameData.hero.x + gameData.hero.width  > this.x &&
                        gameData.hero.y < this.y + this.height && gameData.hero.y + gameData.hero.height > this.y) {
                        gameStatus = false;
                    }
                    this.x += this.xDelta;
                    this.y += this.yDelta;
                    if(this.x >= canvas.width - this.width){
                        this.xDelta = (Math.random()) * 8;
                        this.xDelta *= -1;
                        this.image = badGuyOption();
                    }
                    if(this.x <= 0){
                        this.xDelta = (Math.random() - 1.5) * 8;
                        this.xDelta *= -1;
                        this.image = badGuyOption();
                    }
                    if(this.y >= canvas.height - this.height){
                        this.yDelta = (Math.random()) * 8;
                        this.yDelta *= -1;
                        this.image = badGuyOption();
                    }
                    if(this.y <= 0){
                        this.yDelta = (Math.random() - 1.5) * 9;
                        this.yDelta *= -1;
                        this.image = badGuyOption();
                    }
                }
            };
            gameData.badGuys[i] = obj;
        }
    }





    createVillains(10, canvas.width, canvas.height);

    function draw(){

        //c.strokeStyle = "black";
        //c.lineWidth = 3;
        //c.strokeRect(0, 0, canvas.width, canvas.height);
        c.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        gameData.hero.draw();
        for(var i = 0; i < gameData.badGuys.length; i++) {
            gameData.badGuys[i].draw();

        }
    }

    function update(){
        for(var i = 0; i < gameData.badGuys.length; ++i){
            gameData.badGuys[i].update();
        }
    }


    function animate(){
        if(gameStatus) {
            requestAnimationFrame(animate);
            c.clearRect(0,0,canvas.width,canvas.height);
            draw();
            update();
        } else {
            alert("game over, wanna try again?")
        }


    }

    animate();
