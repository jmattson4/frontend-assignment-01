import ejs from 'ejs'

function renderSymbolMatchEJS(template, symbolsArray){
   return ejs.render(template, {
       symbols:symbolsArray,
    })
}

function renderGlobalQuoteEJS(template, globalQuote, symbolName){
    return ejs.render(template, {
        globalQuote:globalQuote,
        symbolName:symbolName,
    })
}

export {
    renderSymbolMatchEJS,
    renderGlobalQuoteEJS
} 