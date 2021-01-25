import { API_ORIGIN } from './utils/constants';
import { StockController } from './controllers/stockController';
import { StockService } from './services/stockService';
import { StockRepository } from './repositories/stockRepo';
import { searchStockBar } from './events/stockEvents';


/**
 * Main entry for javascript code into the application.
 * runs after the window has loaded.
 */
window.addEventListener('load', (event) => {
    //grab config variables from env
    const apikey = process.env.ALPHA_VANTAGE_KEY;

    //setup repos, services, and controllers.
    const stockRepo = new StockRepository();
    const stockService = new StockService(API_ORIGIN, apikey, stockRepo);
    const stockController = new StockController(stockService);    

    //grab initial elements on index.html
    const button = document.querySelector('button');

    //setup events.
    button.addEventListener('click', searchStockBar(stockController));

})