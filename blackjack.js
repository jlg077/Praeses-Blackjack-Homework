var Suits = ["spades", "hearts", "diamonds", "clubs"];
var cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var players = new Array();
var Deck = new Array();
currentPlayer = 0;

function buildDeck()
{
    Deck = new Array();
    for (var i = 0; i < cardValue.length; i++)
    {
        for (var j = 0; j < Suits.length; j++)
        {
            var blackjackNumber = parseInt(cardValue[i]);
            var blackjackNumber2 = parseInt(cardValue[i]);
            if (cardValue[i] == "J" || cardValue[i] == "Q" || cardValue[i] == "K")
                blackjackNumber = 10;
            if (cardValue[i] == "A")
                blackjackNumber = 11;
                blackjackNumber2 = 1;
            var Card = {Value: cardValue[i], Suits: Suits[j], blackjackNumber: blackjackNumber};
            Deck.push(Card);
        }
    } 
}

function shuffle()
{
    //the way this will work is by switching two random cards
    for (var i = 0; i < 300; i++)
    {
        var card1 = Math.floor((Math.random() * Deck.length));
        var card2 = Math.floor((Math.random() * Deck.length));
        var temp = Deck[card1];
        Deck[card1] = Deck[card2];
        Deck[card2] = temp;
    }
}

function Players(num)
{
    players = new Array();
    for (var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = {Name: 'Player' + i, ID: i, Points: 0, Hand: hand};
        players.push(player); 
    }
}

function PlayerUI()
        {
            document.getElementById('Players').innerHTML = '';
            for(var i = 0; i < players.length; i++)
            {
                var div_player = document.createElement('div');
                var div_playerid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_points = document.createElement('div');

                div_points.className = 'Num_of_Points';
                div_points.id = 'points_' + i;
                div_player.id = 'player_' + i;
                div_player.className = 'Player';
                div_hand.id = 'Player_hand' + i;

                div_playerid.innerHTML = 'Player ' + players[i].ID;
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('Players').appendChild(div_player);
            }
        }

function Deal()
{
    for(var i = 0; i < 2; i++)
    {
        for(var x = 0; x < players.length; x++)
        {
            var card = Deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            increasePoints();
        }
    }
    updateDeck();
}

function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(getCardUI(card));
        }

        function getCardUI(card)
        {
            var el = document.createElement('div');
            var icon = '';
            if (card.Suit == 'Hearts')
            icon='&hearts;';
            else if (card.Suit == 'Spades')
            icon = '&spades;';
            else if (card.Suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';
            
            el.className = 'card';
            el.innerHTML = card.Value + '<br/>' + icon;
            return el;
        }

        
        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < players[player].Hand.length; i++)
            {
                points += players[player].Hand[i].Weight;
            }
            players[player].Points = points;
            return points;
        }

        function increasePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

function Hit()
{
    var card = Deck.pop();
    players[currentPlayer].Hand.push(card);
    increasePoints();
    check();
}

function check()
{
    if (players[currentPlayer].Points > 21)
    {
      document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + 'Lost';  
    }
}

function Stay()
{
    if (currentPlayer != players.length-1)
    {
       document.getElementById('player' + currentPlayer).classList.remove('active');
       currentPlayer += 1;
       document.getElementById('player' + currentPlayer).classList.add('active'); 
    }

    else
    {
        end();
    }
}

function end()
{
    var winner = -1;
    var score = 0;
    for(var i = 0; i < players.length; i++)
    {
        if (players[i].Points > score && players[i].Points < 22)
        {
            winner = i;
        }

        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
    document.getElementById('status').style.display = "inline-block";

}

function startGame()
{
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display = "none";
    currentPlayer = 0;
    buildDeck();
    shuffle();
    Players(2);
    PlayerUI();
    Deal();
    document.getElementById('Players_' + currentPlayer).classList.add('active')

}

function updateDeck()
{
    document.getElementById('deckcount').innerHTML = deck.length;
}