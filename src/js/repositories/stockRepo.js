import { SymbolMatch } from '../models/symbolMatchModel';
import { GlobalQuote } from '../models/globalQuoteModel'; 
/**
 * StockRepository
 * 
 * This class holds the applications data which is queried from the Stock API.
 * It is essentially a store for the application and is used to hold data
 * 
 */
class StockRepository {
    /**
     * @param {Array<SymbolMatch>} symbolMatchs 
     */
    constructor(symbolMatchs = []){
        this.SymbolMatchs = symbolMatchs;
        this.SymbolIsFull = this.SymbolMatchs.length > 0 ? true : false;

        this.SelectedSymbol = new SymbolMatch();
        this.SelectedGlobalQuote = new GlobalQuote();
        this.IsSelected = false;
    }
    /**
     * Reset the Selected symbol match and all associated values.
     */
    resetSelectedSymbol(){
        this.SelectedSymbol = new SymbolMatch();
        this.SelectedGlobalQuote = new GlobalQuote();
        this.IsSelected = false;
    }
    /**
     * Checks if the current symbol match has 
     */
    isSymbolFull(){
        return this.SymbolIsFull;
    }
    /**
     * Returns the Symbol matches Array from the Repository.
     */
    all(){
        return this.SymbolMatchs;
    }

    /**
     * Essentially a reconstructor in case the repo needs to be reset.
     * @param {Array<SymbolMatch>} symbolMatchs 
     */
    replace(symbolMatchs = []){
        this.SymbolMatchs = symbolMatchs;
        this.SymbolIsFull = this.SymbolMatchs.length > 0 ? true : false;
    }
    /**
     * This allows a new SymbolMatch to be added to the repository.
     * @param {SymbolMatch} symbol 
     */
    create(symbol){
        if(symbol == undefined)
            throw new Error("Must provide a symbol to add to the repository");
        this.SymbolMatchs.push(symbol);
    }
    /**
     * Search the Symbol Matches Array in the repository for a matching symbol.
     * @param {string} symbol 
     */
    findBySymbol(symbol = ''){
        if(this.SelectedSymbol.Symbol = symbol) 
            return this.SelectedSymbol;
        this.SelectedSymbol = this.SymbolMatchs.filter(sym => sym.Symbol === symbol);
        return this.SelectedSymbol;
    }
}

export {
    StockRepository,
}