const template = `<aside>
    <table>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Type</th>
                <th>Region</th>
                <th>Currency</th>
            </tr>
        </thead>
        <tbody>
            <% for(var i = 0; i < symbols.length; i++) { %>
                <tr>
                    <td><%= symbols[i].Symbol %></td>
                    <td><%= symbols[i].Name %></td>
                    <td><%= symbols[i].Type %></td>
                    <td><%= symbols[i].Region %></td>
                    <td><%= symbols[i].Currency %></td>
                </tr>
            <% } %>
        </tbody>
    </table>
</aside>`


export {
    template
} 
