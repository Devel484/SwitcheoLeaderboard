
function Switcheo(){

    this.xhttp = new XMLHttpRequest();
    this.contract = "91b83e96f2a7c4fdf0c1688441ec61986c7cae26"
    this.url = "https://api.switcheo.network"
    this.xhttp.onreadystatechange = function() {
        console.log(this)
        if (this.readyState === 4 && this.status === 200) {
            this.onreadystatechange.receivedReponse(this)
        }
    };

    this.xhttp.onreadystatechange.switcheo = this;

    this.xhttp.onreadystatechange.receivedReponse = function(response){
        let result = JSON.parse(response.responseText)
        if(response.responseURL.includes("/v2/orders")) {
            //console.log(result)
            this.switcheo.loadedOrders(result)
        }
    }

    this.loadOrders = function(address, pair){
        this.xhttp.open("GET", this.url+"/v2/orders?contract_hash="+this.contract+"&address="+address+"&pair="+pair, true);
        this.xhttp.send();
    }

    this.loadedOrders = function(result){
        //document.getElementById("demo").innerHTML = result;
        amount = 0;
        for(let i = 0; i < result.length; ++i){
            trade = new Trade(result[i]);
            console.log(trade.toString());
            amount += trade.getQuoteAmount();
        }
        console.log(amount+ " NEO");
        amount = amount / Math.pow(10,8);
        console.log(amount.toFixed(8)+" NEO")
    };

    this.loadTrades = function(pair){
        this.xhttp.open("GET", this.url+"/v2/trades?contract_hash="+this.contract+"&pair="+pair, true);
        this.xhttp.send();
    }
}