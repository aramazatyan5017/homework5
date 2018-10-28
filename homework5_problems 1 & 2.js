const canvas = document.getElementById("canvas");
    const c = canvas.getContext("2d");
    const rand = function(num) {
        return Math.floor(Math.random() * num);
    };

    function createBoxes(count, canvasWidth, canvasHeight){
      var arr = [];

      const colorArray = ["red","green","blue", "orange", "purple", "pink", "brown", "lightBlue"];
      const width = 30;
      const height = 30;
      for(var i = 0; i < count; i++){
          var obj = {
              width: width,
              height: height,
              x: rand(canvasWidth - width),
              y: rand(canvasHeight - height),
              xDelta: (Math.random() - 0.5) * 40,
              yDelta: (Math.random() - 0.5) * 40,
              color: colorArray[rand(colorArray.length)],
              draw: function () {
                  c.fillStyle = this.color;
                  c.fillRect(this.x, this.y, this.width, this.height);
              },
              update: function () {
                  this.x += this.xDelta;
                  this.y += this.yDelta;
                  if(this.x >= canvas.width - this.width){
                      this.color = colorArray[rand(colorArray.length)];
                      this.xDelta = (Math.random()) * 8;
                      this.xDelta *= -1;
                  }
                  if(this.x <= 0){
                      this.color = colorArray[rand(colorArray.length)];
                      this.xDelta = (Math.random() - 1.5) * 8;
                      this.xDelta *= -1;
                  }
                  if(this.y >= canvas.height - this.height){
                      this.color = colorArray[rand(colorArray.length)];
                      this.yDelta = (Math.random()) * 8;
                      this.yDelta *= -1;
                  }
                  if(this.y <= 0){
                      this.color = colorArray[rand(colorArray.length)];
                      this.yDelta = (Math.random() - 1.5) * 9;
                      this.yDelta *= -1;
                  }

              }
          };
          arr[i] = obj;
      }
      return arr;
    }

    var arr1 = createBoxes(20, canvas.width, canvas.height);
    function draw(){
        c.strokeStyle = "black";
        c.lineWidth = 3;
        c.strokeRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < arr1.length; i++) {
            arr1[i].draw();

        }
    }
    function update(){
        for(var i = 0; i < arr1.length; ++i){
            arr1[i].update();
        }
    }


    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0,0,canvas.width,canvas.height);
        draw();
        update();
    }

    animate();
