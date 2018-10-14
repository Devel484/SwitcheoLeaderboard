

function Trade(data){

    this.id = data["id"];
    this.createdAt = data["created_at"];
    this.baseAmount = 0;
    this.quoteAmount = 0;
    this.feeAmount = 0;
    for(let i = 0 ; i < data["fills"].length ; ++i){
        filled = data["fills"][i];
        side = filled["side"];
        price = parseFloat(filled["price"]);
        this.feeAmount += parseInt(filled["fee_amount"]);
        this.quoteAmount += parseInt(filled["want_amount"]); // SWTH
        this.baseAmount += Math.floor(parseInt(filled["want_amount"]) * price)
        //this.quoteAmount += Math.floor(parseInt(filled["want_amount"])*price); // NEO
        /*if(side === "buy"){
            this.baseAmount += Math.floor(parseInt(filled["want_amount"])/price); // NEO
        }else{
            this.baseAmount += Math.floor(parseInt(filled["want_amount"])*price); // SWTH
        }*/
    }

    this.getBaseAmount = function(){
        return this.baseAmount;
    };

    this.getQuoteAmount = function(){
        return this.quoteAmount;
    };

    this.getFeeAmount = function(){
        return this.feeAmount;
    };

    this.getCreatedAt = function(){
        return this.createdAt;
    };

    this.toString = function(){
      return "Base / Quote: "+this.baseAmount+" / "+this.quoteAmount + " Price:"+ (this.quoteAmount/this.baseAmount).toFixed(8);
    };
}