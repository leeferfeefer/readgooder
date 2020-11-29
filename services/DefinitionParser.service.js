

const parse = (word, definitionResponse) => {
    let wordStuff = [];
    if (definitionResponse?.length > 0) {
        let definitions = definitionResponse.filter(definition => {
            const metaID = definition?.meta?.id;                
            const index = metaID?.indexOf(":");
            if (!!!index || index === -1) {
                return false;
            }
            const wordFromMetaID = metaID.substring(0, index);    
            return wordFromMetaID.toLowerCase() === word.toLowerCase();
        });
        if (definitions.length === 0) {
            definitions = definitionResponse.filter(definition => {
                const metaID = definition?.meta?.id;
                return metaID.toLowerCase() === word.toLowerCase();
            });
        }
        definitions.forEach(definition => {
            const wordThingy = {
                definition: definition?.shortdef?.[0],
                partOfSpeech: definition?.fl
            };
            wordStuff.push(wordThingy);        
        });
    }
    return wordStuff;
};

export default {
    parse
};