var p, pI
var opp, oppI
var net
var ball, ballI
var restartButton, restartBI
var invisibleWall
var winSound
var loseSound
var pAction = "readyingForServe"
var winner = ""
var lastPersonWhoHitTheBall = ""
var gamestate = "play"
var deciderForSpike, deciderForSpike2
var netEdge


function preload() {
    pI = loadImage("p.png")
    oppI = loadImage("opp.png")
    
    ballI = loadImage("ball.png")

    restartBI = loadImage("playAgain.png")

    winSound = loadSound("win.mp3")
    loseSound = loadSound("lose.mp3")
}
  

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    edges = createEdgeSprites()

    deciderForSpike = createSprite(width/2.56, height/1.1, 1)
    deciderForSpike2 = createSprite(width/6, height/1.1, 1)

    p = createSprite(width/5, height/1.2)
    p.addImage(pI)

    opp = createSprite(width/1.2, height/1.2)
    opp.addImage(oppI)

    invisibleWall = createSprite(width/2, height, width/50, height*10)
    invisibleWall.shapeColor = "white"

    net = createSprite(width/2, height/1.054, width/75, height/6)
    net.shapeColor = "black"

    netEdge = createSprite(width/2, height/1.156, width/75, height/1000)
    netEdge.shapeColor = "black"

    ball = createSprite(width/2, height/2)
    ball.addImage(ballI)
    ball.scale = 0.15

    restartB = createSprite(width/2, height/1.5)
    restartB.addImage(restartBI)
    restartB.visible = false
}


function draw() {
    console.log(pAction)
    background("white")

    deciderForSpike.visible = false
    deciderForSpike2.visible = false

    if(gamestate == "play"){
        restartB.visible = false
        p.visible = true
        opp.visible = true
        ball.visible = true
        net.visible = true
        invisibleWall.visible = true

        p.velocityY+= 0.3
        opp.velocityY+= 0.3

        if(keyDown("up") && p.collide(edges)){
            p.velocityY= -10
        }
        else if(keyDown("right")){
            p.x+=6
        }
        else if(keyDown("left")){
            p.x-=6
        }

        if(pAction == "play" && ball.x >= invisibleWall.x){
            if(ball.x > opp.x){
                opp.velocityX= 15
            }
            if(ball.x < opp.x){
                opp.velocityX= -15
            }
        

            if(pAction != "readyingForServe"){
                ball.velocityY+=0.3
            }
        }
        else{
            opp.x = width/1.35
        }

        if(ball.isTouching(opp)){
            if(ball.x >width/2 && ball.x <width/1.3){
                ball.velocityX= -7
                ball.velocityY= -15
            }
            if(ball.x >width/1.3 && ball.x <width){
                ball.velocityX= -15
                ball.velocityY= -15
            }
        }

        if(ball.collide(edges[0])){
            winSound.play()
            winner = "p"
            gamestate = "end"
        }
        if(ball.collide(edges[1])){
            loseSound.setVolume(8)
            loseSound.play()
            winner = "opp"
            gamestate = "end"
        }
        
        if(ball.collide(edges[3])){
            if(ball.x < (width/2)){
                loseSound.setVolume(8)
                loseSound.play()
                winner = "opp"
                gamestate = "end"
            }
            else if(ball.x > (width/2)){
                winSound.play()
                winner = "p"
                gamestate = "end"
            }
        }


        if(pAction != "readyingForServe"){
            ball.velocityY+= 0.2
        }

        if(ball.collide(netEdge)){
            ball.x = netEdge.x+100
            ball.y = netEdge.y
            ball.velocityX = 10
        }

        p.collide(edges)
        opp.collide(edges)
        p.collide(invisibleWall)
        opp.collide(invisibleWall)
        ball.bounceOff(edges[3])
        ball.bounceOff(net)

        action(deciderForSpike, deciderForSpike2)
    }
    else if(gamestate == "end"){
        restartB.visible = true
        p.visible = false
        opp.visible = false
        ball.visible = false
        net.visible = false
        invisibleWall.visible = false
        if(winner == "p"){
            background("green")
            textSize(50)
            fill("pink")
            text("You WON!" , width/2.3, height/2)
            if(mousePressedOver(restartB)){
                ball.y=height/2
                winner = ""
                pAction = "readyingForServe"
                gamestate = "play"
                p.y = height/1.2
                p.x = width/5
            }
        }
        else if(winner == "opp"){
            background("red")
            textSize(50)
            fill("white")
            text("You lost..." , width/2.3, height/2)
            if(mousePressedOver(restartB)){
                ball.y=height/2
                winner = ""
                pAction = "readyingForServe"
                gamestate = "play"
                p.y = height/1.2
                p.x = width/5
            }
        }
    }
    drawSprites()
}
