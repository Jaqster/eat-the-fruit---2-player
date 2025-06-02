// Player who gets to 10 first wins
mp.onScore(10, function (player2) {
    mp.gameOverPlayerWin(player2)
})
// When a Player sprite overlaps a Food sprite, increment the appropriate player's score, destroy the fruit and play a sound
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.score, 1)
    otherSprite.destroy(effects.spray, 100)
    music.baDing.play()
})
// When a Player sprite overlaps an Enemy sprite, decrement by 2 the appropriate player's score, destroy the cake and play a sound
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.score, -2)
    otherSprite.destroy(effects.fire, 100)
    music.zapped.play()
})
let cake: Sprite = null
let cherry: Sprite = null
scene.setBackgroundColor(13)
// These blocks are part of the Multiplayer extension
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Hero1`, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`Hero2`, SpriteKind.Player))
for (let value of mp.allPlayersWithSprites()) {
    // Setting the player sprite position to a random (x, y) coordinate location on the screen
    mp.getPlayerSprite(value).setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    mp.getPlayerSprite(value).setStayInScreen(true)
    // Allow the user to move player sprites around the screen with joystick/keyboard
    mp.moveWithButtons(value)
    mp.setPlayerState(value, MultiplayerState.score, 0)
}
// Every 1 second, create a fruit projectile moving horizontally across the screen.
game.onUpdateInterval(1000, function () {
    cherry = sprites.createProjectileFromSide(assets.image`Cherry`, 50, 0)
    cherry.setPosition(0, randint(0, scene.screenHeight()))
    // We need to set the Sprite kind to Food for the overlaps to work
    cherry.setKind(SpriteKind.Food)
})
// Every 3 seconds, create a junk food enemy sprite that bounces around the screen.
game.onUpdateInterval(3000, function () {
    cake = sprites.create(assets.image`Cake`, SpriteKind.Enemy)
    cake.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    cake.setVelocity(25, 25)
    cake.setBounceOnWall(true)
})
