const axios = require('axios').default;

module.exports = {

    search: async (req, res) => {
        const {searchTerm} = req.body
        
        let searchResults = []
        
        
        await axios.get(`https://imdb-api.com/en/API/SearchAll/k_i466l60f/${searchTerm}`).then((res) => {
            
            searchResults = res.data.results
        })

        const filteredSearchResults = searchResults.filter(result => result.resultType === "Title")
         
        console.log(filteredSearchResults);
        res.status(200).send(filteredSearchResults)
       
        
    }
}