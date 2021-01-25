//origin should be https://www.alphavantage.co/,
// query is in the format of query?params1=&params2=&apikey=
async function getRequest(origin, query){
    return await fetch(`${origin}/${query}`, {
        method: 'GET',
        mode: 'cors',
    });
}


export {
    getRequest,
}