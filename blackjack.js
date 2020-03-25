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
            var blackjackNumber = parseInt(cardValue[i]);//parses the list with card values and returns a specified radix integer
            var blackjackNumber2 = parseInt(cardValue[i]);
            if (cardValue[i] == "J" || cardValue[i] == "Q" || cardValue[i] == "K")
                blackjackNumber = 10;
            if (cardValue[i] == "A")//this was my attempt to split the value of an Ace, as it can be an 11 or a 1
                blackjackNumber = 11;
                blackjackNumber2 = 1;
            var Card = {Value: cardValue[i], Suits: Suits[j], blackjackNumber: blackjackNumber};
            Deck.push(Card);//gives the card a suit and value and then pushes it into the deck
        }
    } 
}

function shuffle()
{
    //the way this will work is by switching two random cards, 300 times
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
        players.push(player);  //creates players, giving them a number, how many points they have currently, and their hand of cards
    }
}

function PlayerUI()//Ideally, this would be used to create a UI for the game to make it visually appealing
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
            increasePoints();//deals the cards, increasePoints gives the player the current value of their hand
        }
    }
    updateDeck();
}

function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            hand.appendChild(getCardUI(card));//this would have been used to render cards for the UI
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
            return points;//iterates through the length of the players' hand of cards and returns the points which is equal to the weight of the cards
        }

        function increasePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

function Hit()//Gives the player the card at the top of the deck
{
    var card = Deck.pop();
    players[currentPlayer].Hand.push(card);
    increasePoints();
    check();
}

function check()//Checks a players' current points, if over 21 they lose
{
    if (players[currentPlayer].Points > 21)
    {
      document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + 'Lost';  
    }
}

function Stay()//The current player opts out of getting a new card and the dealer moves to the next player
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

function end()//ends the game and tallies up the points, highest score wins. In a draw the dealer wins
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

function startGame()//This would have initialized the game, GUI and all
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

function updateDeck()//updates the deck when a card is pulled from it
{
    document.getElementById('deckcount').innerHTML = deck.length;
}
