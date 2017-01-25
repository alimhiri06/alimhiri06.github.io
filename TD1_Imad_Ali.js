pragma solidity ^0.4.8;
contract Organisation {
    
    // Element of the proposition to accept
    string public name;
    address creator;
   //Definition of the possibilities of the vote
    enum VoteType { Blanc, Oui, Non }
    //Nomber of each votes
    uint valueblanc = 0;
    uint valueoui = 0;
    uint valuenon = 0;
    //Definition of a ballot, contains the result and the adress of a voter
    struct Vote {
        VoteType voteType;
        address votant;
    }
    //Creation of the list who will contains all the votes
    Vote[] public votes;
    
    //Modifier who check if the person can vote
    modifier transactionIsAlreadyDone() {
        for (uint i = 0; i < votes.length; i++) {
            if(votes[i].votant == msg.sender) throw;
        }
        _;
    }
    //Modifier who check if it's the end of the vote
    modifier finduvote() {
            if(votes.length != 15) throw;
        _;
    }

    //Definition of the Project
    function ObjetduVote(string _name) {
        name= _name;
        creator = msg.sender;
    }

    //Functions of votes
    function VoteBlanc() transactionIsAlreadyDone() {
        votes.push(Vote({
        voteType: VoteType.Blanc,
        votant: msg.sender,
        }));
    }

    function VoteOui() public transactionIsAlreadyDone() {
        votes.push(Vote({
        voteType: VoteType.Oui,
        votant: msg.sender,
        }));
    }
    function VoteNon() public transactionIsAlreadyDone() {
        votes.push(Vote({
        voteType: VoteType.Non,
        votant: msg.sender,
        }));
    }

    //To knows the number of voters and update the numbers of each option
    function getVoteCount() public returns (uint) {
        valueblanc = 0;
        valueoui = 0;
        valuenon = 0;

        for (uint i = 0; i < votes.length; i++) {
            if(votes[i].voteType== VoteType.Blanc)
            {
                valueblanc++;
            }
            else if(votes[i].voteType==VoteType.Oui)
            {
                valueoui++;
            }
            else if(votes[i].voteType==VoteType.Non)
            {
                valuenon++;
            }
        }
        return votes.length;
    }


    //To knows the resultat only if the 15 people have voted
    function getResultat() public finduvote() returns(bool,uint,uint,uint){
        bool resultat= false;
        getVoteCount();
        if(valueoui>(votes.length/2)+1){
            resultat = true;
        }
        return (resultat,valueblanc,valueoui,valuenon);  
    }

}