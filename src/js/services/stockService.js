import 'regenerator-runtime/runtime'

import { getRequest } from '../utils/apiRequester';
import { SymbolMatch } from '../models/symbolMatchModel';
import { GlobalQuote } from '../models/globalQuoteModel';
import { StockRepository } from '../repositories/stockRepo';



/**
 * The Stock Service.
 * 
 * on instantiation the api origin, apikey and stockRepo is injected into the stock service.
 * The service is then used to pull data from the API along with caching that
 * data in the repository.
 */
class StockService {
    /**
     * 
     * @param {string} origin // This is the API URL Origin
     * @param {string} apiKey 
     * @param {StockRepository} stockRepo 
     */
    constructor(origin, apiKey, stockRepo) {
        if (origin == undefined || apiKey == undefined || stockRepo == undefined)
            throw new Error("Please provide a origin, keyword and Stock Repo to the Stock Service");
        this.Origin = origin;
        this.ApiKey = apiKey;
        this.StockRepo = stockRepo;
    }
    /**
     * Resets the Selected SymbolMatch object and associated GlobalQuote '
     * object in the Repository.
     */
    resetSelected(){
        this.StockRepo.resetSelectedSymbol();
    }
    /**
     * Used to find the symbol within the repository
     * @param {string} symbol this is the stock sticker symbol
     */
    findBySymbol(symbol = ''){
        const sym = this.StockRepo.findBySymbol(symbol);
        return sym;
    }
    isSymbolFull(){
        return this.StockRepo.isSymbolFull();
    }
    getSymbolmatches(){
        return this.StockRepo.all();
    }
    /**
     * Sends a symbol_search query to the api
     * @param {string} keywords 
     */
    async symbolSearch(keywords) {
        if (keywords == undefined)
            throw new Error("Please provide keyword for the symbol search.");
        if (keywords.length > 4){
            throw new Error("Stock Ticker symbol length cannot be greater than 4 characters.");
        }
        const queryString = `query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${this.ApiKey}`;
        let response = await getRequest(this.Origin, queryString);
        response = await response.json();
        const symbolSearchArray = response["bestMatches"].map(stockInfo => {
            return new SymbolMatch(
                stockInfo['1. symbol'],
                stockInfo["2. name"],
                stockInfo["3. type"],
                stockInfo["4. region"],
                stockInfo["8. currency"])
        })
        this.StockRepo.replace(symbolSearchArray)
        return this.StockRepo.all();
    }
    /**
     * sends a global quote query to the api.
     * @param {string} symbol 
     */
    async globalSearch(symbol){
        if (symbol == undefined)
            throw new Error("Please provide symbol for the Global Qyote search.");
        const queryString = `query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.ApiKey}`;
        let response = await getRequest(this.Origin, queryString);
        response = await response.json();
        //create new GlobalQuote object
        const global = new GlobalQuote(
            response["Global Quote"]["01. symbol"],
            response["Global Quote"]["02. open"],
            response["Global Quote"]["03. high"],
            response["Global Quote"]["04. low"],
            response["Global Quote"]["05. price"]       
        )
        //Set the Selected GlobalQuote to the new GlobalQuote object
        this.StockRepo.SelectedGlobalQuote = global;
        //then set the Stockrepo.iSSelcted attribute to true this is to make sure
        //  the user cant click another stock while the Global Quote Display
        //  is selected.
        this.StockRepo.IsSelected = true;
        return this.StockRepo.SelectedGlobalQuote
    }
}

export {
    StockService
}