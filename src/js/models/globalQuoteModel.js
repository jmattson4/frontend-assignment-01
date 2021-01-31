

class GlobalQuote {
    constructor(symbol, open, high, low, closePrice){
        this.Symbol = symbol;
        this.Open = open;
        this.High = high;
        this.Low = low;
        this.ClosePrice = closePrice;
        this.DatePulled = new Date(Date.now());
    }
}


export {
    GlobalQuote
}