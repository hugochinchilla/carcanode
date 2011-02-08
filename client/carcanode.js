//
// Carcanode's client.js
// Author: "Hugo Chinchilla" <hugo@bulma.net> | http://www.hugochinchilla.net
//

var assert = function(cond, msg) {
    if (!cond) {
        msg = msg || "Asert failed!";
        console.error(msg);
        throw msg;
    }
}

const FARM = 'farm';
const ROAD = 'road';
const CITY = 'city';
//const RIVR = 'river';

var tile_skel = {
    sides:      null,
    repr:       null,
    road_end:   false,
    pennant:    false,
    cloister:   false,
}

var tile_types = [
    [2, { sides: [FARM,FARM,ROAD,FARM], repr: 'tile01', road_end: true, cloister: true }],
    [1, { sides: [CITY,CITY,CITY,CITY], repr: 'tile02', pennant: true }],
    [4, { sides: [ROAD,CITY,ROAD,FARM], repr: 'tile03' }],
    [1, { sides: [CITY,CITY,FARM,CITY], repr: 'tile04' }],
    [2, { sides: [FARM,CITY,FARM,CITY], repr: 'tile05' }],
    [8, { sides: [ROAD,FARM,ROAD,FARM], repr: 'tile06' }],
    [5, { sides: [CITY,FARM,FARM,FARM], repr: 'tile07' }],
    [4, { sides: [FARM,ROAD,ROAD,ROAD], repr: 'tile08', road_end: true }],
    [2, { sides: [CITY,ROAD,ROAD,CITY], repr: 'tile09' }],
    [4, { sides: [FARM,FARM,FARM,FARM], repr: 'tile10' }],
]

var game = {
    players: ['Player 1', 'Player 2'],
    pile: [],
    current_tile: null,
    
    start: function() {
        game.createTiles();
        game.buildBoard();
        game.setEvents();
        game.playNextTurn();
    },
    
    createTiles: function(){
        tile_types.each(function(e){
            var amount = e[0], definition = e[1];
            for (i=0; i<amount; i++) {
                game.pile.push(game.tileFromDefinition(definition));
            }
        })
    },
    
    tileFromDefinition: function(def) {
        return Object.merge(tile_skel, def);
    },
    
    setEvents: function() {},
    
    playNextTurn: function() {
        game.current_tile = game.pile.getRandom();
    },
    
    tileToElement: function() {
        
    },
    
    buildBoard: function() {
        var board = $('board');
        for (i=0; i<60; i++) {
            for (j=0; j<40; j++) {
                board.grab(game.createBoardSquare(i,j));
            }
        }
        
        new Drag($('board'), {snap: 0});
    },
    
    createBoardSquare: function(x,y) {
        var coord_string = x+','+y, element;
        element = new Element('div', {
            'data-coord': coord_string,
            'class': 'square'
        });
        element.style['left'] = (x-1)*50 + 'px';
        element.style['top'] = (y-1)*50 + 'px';
        return element;
    }
}

window.addEvent('domready', function(){
    game.start();
});