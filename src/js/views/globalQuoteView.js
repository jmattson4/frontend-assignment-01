const gqTemplate = `<aside>
    <h3><%= symbolName %></h3>
    <div>
        <label for="gq-symbol">Symbol: </label>
        <p id="gq-symbol"><%= globalQuote.Symbol %></p>
    </div>
    <div>
        <label for="gq-open">Open: </label>
        <p id="gq-open">$<%= globalQuote.Open %></p>    
    </div>
    <div>
        <label for="gq-high">High: </label>
        <p id="gq-high">$<%= globalQuote.High %></p>    
    </div>
    <div>
        <label for="gq-low">Low: </label>
        <p id="gq-low">$<%= globalQuote.Low %></p>    
    </div>
    <div>
        <label for="gq-price">Price: </label>
        <p id=gq-price>$<%= globalQuote.ClosePrice %></p>    
    </div>
    <div>
        <label for="gq-price">Date: </label>
        <p id=gq-price><%= globalQuote.DatePulled %></p>    
    </div>    
</aside>`;


export {
    gqTemplate
}