function action(sprite, sprite2){
    if(pAction == "readyingForServe"){
        ball.x = p.x+30
        ball.y = p.y+30
        if(keyDown("space")){
            pAction = "serve"
        }
    }
    else if(pAction == "serve"){
        if(keyDown("right")){
            ball.velocityX = 2
            ball.velocityY = -15
        }
        else{
            ball.velocityX = 0
            ball.velocityY = -15
        }
        pAction = "play"
        lastPersonWhoHitTheBall = "p"
    }
    else if(pAction == "play"){
            if(p.isTouching(ball)){
                if(keyDown("shift")){
                    if(keyDown("space") && keyDown("up")){
                        p.changeAnimation("swing")
                        tooHard = true
                        ball.velocityX= 90
                        ball.velocityY = 18
                        lastPersonWhoHitTheBall = "p"
                    }
                    else{
                        ball.velocityX= 0
                        ball.velocityY= -6
                    }
                }
                else if(keyDown("space")){
                    p.changeAnimation("swing")
                    if(p.x > sprite.x){
                        ball.velocityX= 40
                        ball.velocityY = 30
                        lastPersonWhoHitTheBall = "p"
                    }
                    else if(p.x < sprite.x && p.x > sprite2.x){
                        ball.velocityX= 30
                        ball.velocityY = 8
                        lastPersonWhoHitTheBall = "p"
                    }
                    else if(p.x < sprite2.x && p.x < sprite.x){
                        ball.velocityX= 30
                        ball.velocityY = 3
                        lastPersonWhoHitTheBall = "p"
                    }
                }
                else if(keyDown("down")){
                    ball.velocityX= 10
                    ball.velocityY= -15
                    lastPersonWhoHitTheBall = "p"
                }
                else if(keyDown("z")){
                    if(keyDown("right")){
                        if(keyDown("up")){
                            ball.velocityX = 5
                            ball.velocityY = -10
                        }
                        ball.velocityX = 3
                        ball.velocityY = -10
                    }
                    else{
                        ball.velocityX = 0.5
                        ball.velocityY = -10
                    }
                }
                else if(keyDown("x")){
                    ball.velocityX= 40
                    ball.velocityY= 60
                }
            }
        }
}
