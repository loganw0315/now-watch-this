const axios = require('axios').default;

module.exports = {

    search: async (req, res) => {
        const {searchTerm} = req.body
        
        let searchResults = []
        
        
        await axios.get(`https://imdb-api.com/en/API/SearchAll/k_i466l60f/${searchTerm}`).then((res) => {
            
            searchResults = res.data.results
        })
        if(searchResults){
            const filteredSearchResults = searchResults.filter(result => result.resultType === "Title")
            res.status(200).send(filteredSearchResults)
        } else{
            res.status(500).send('Results could not be retrieved')
        }
       
        
    }
}