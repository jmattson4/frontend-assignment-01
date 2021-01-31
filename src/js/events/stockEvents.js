/**
 * Events 
 * This module is hold the functions which can be used for events throughout the 
 * program using addEventListener to a document element.
 * 
 * LAST EDIT: 2021-01-24
 * LAST EDIT BY: Jace Mattson
 */
import { StockController } from '../controllers/stockController';
import { addToDom, removeChildren } from '../utils/domHelper';


/**
 *  This event has StockController injected into it to enable the globalquote view to 
 *  render when the user clicks a row of the table.
 * 
 * @param {StockController} controller 
 */
function clickRow(controller) {
    return function (event) {
        //This is to prevent double clicks from causing the event to fire twice.
        if (event.detail > 1) {
            return;
        } else {
            //grab elements which will be used.
            const target = event.target.parentElement;
            const symbol = target.children[0];
            const globalQuote = document.getElementById('h2-global-quote');

            //if the target classList already has a length and stock has been selected then
            // a click to the row will cause the row to be unclicked resetting the selected data
            if (target.classList.length > 0 && controller.StockService.StockRepo.IsSelected) {
                target.className = '';
                controller.StockService.StockRepo.resetSelectedSymbol();
                removeChildren('.global-quote-display');
                globalQuote.classList.add('hidden');
            } // If no stock is selected then a click will cause one of the rows to be selected
            else if (!controller.StockService.StockRepo.IsSelected) {
                globalQuote.classList.remove('hidden');
                target.classList.add('checkbox');
                const gqElem = controller.createGlobalQuoteView(symbol.textContent);
                gqElem.then(value => {
                    addToDom('.global-quote-display', value);
                })
            }
        }
    }
}

/**
 * This event is ran when the user clicks the search button
 * in the search-stock-display section.
 * 
 * This function returns a function which can be used as an event.
 * The purpose of wrapping the event function is to inject an instance
 * of the stock controller from the index.js file rather than instantiate or 
 * clone a new instance.  
 * @param {StockController} controller 
 */
function searchStockBar(controller){
    return async function(event){
        //This is to prevent double clicks from causing the event to fire twice.
        if(event.detail > 1) {
            return 
        } else {
            const searchBar = document.querySelector('input');
            const stockDisplay = document.getElementById('h2-stock-display');
            const globalQuote = document.getElementById('h2-global-quote');
            const symbolView = await controller.createSymbolMatchView(searchBar.value);
            //remove previous dom elements.
            removeChildren('.stock-result-display');
            removeChildren('.global-quote-display');
            //add newly rendered view onto the dom
            addToDom('.stock-result-display', symbolView);
            //remove hidden class from the stock-display as it was hidden 
            // before the user first renders 
            stockDisplay.classList.remove('hidden');
            globalQuote.classList.add('hidden');
            controller.StockService.StockRepo.resetSelectedSymbol();
            //get the array of tbl rows
            const tblRows = document.querySelector('.stock-result-display tbody').children; 
            const click = clickRow(controller)
            //iterate through the array and apply the clickRow event to each table row.
            for (let index = 0; index < tblRows.length; index++) {
                tblRows[index]
                    .addEventListener('click', click);
            }
        }
    }
}

export {
    searchStockBar,
    clickRow
}