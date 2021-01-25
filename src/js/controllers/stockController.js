import { renderSymbolMatchEJS, renderGlobalQuoteEJS } from '../utils/renderEjs';
import { StockService } from '../services/stockService';
import { template } from '../views/symbolMatchView';
import { gqTemplate } from '../views/globalQuoteView';
import { stringToElement } from '../utils/stringToElement';


class StockController{
    /**
     * 
     * @param {StockService} stockService 
     */
    constructor(stockService){
        this.StockService = stockService
    }
    async createGlobalQuoteView(symbolText){
        const sym = this.StockService.findBySymbol(symbolText);
        const globalQuote = await this.StockService.globalSearch(sym.Symbol); 
        const temp = renderGlobalQuoteEJS(gqTemplate, globalQuote, sym.Name);
        const element = stringToElement(temp);
        return element;
    }

    async createSymbolMatchView(keywords){
        const symbols = await this.StockService.symbolSearch(keywords);
        const temp = renderSymbolMatchEJS(template, symbols)
        const element = stringToElement(temp)
        return element;
    }
}

export {
    StockController
}