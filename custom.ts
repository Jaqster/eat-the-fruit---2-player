namespace mp {
    //% blockId=mp_allPlayersWithSprites
    //% block="array of all players with sprites"
    //% group=Player
    //% weight=90
    //% blockGap=8
    //% parts="multiplayer"
    export function allPlayersWithSprites(): mp.Player[] {
        return mp.allPlayers().filter(p => p && !!p.getSprite());
    }
}
