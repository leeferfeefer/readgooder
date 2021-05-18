

const parse = (word, definitionResponse) => {
    let definitions = [];
    if (definitionResponse?.length > 0) {
        let usableDefinitions = definitionResponse.filter(definition => {
            const metaID = definition?.meta?.id;                
            const index = metaID?.indexOf(":");
            if (!!!index || index === -1) {
                return false;
            }
            const wordFromMetaID = metaID.substring(0, index);    
            return wordFromMetaID.toLowerCase() === word.toLowerCase();
        });
        if (usableDefinitions.length === 0) {
            usableDefinitions = definitionResponse.filter(definition => {
                const metaID = definition?.meta?.id;
                return metaID?.toLowerCase() === word.toLowerCase();
            });
        }
        usableDefinitions.forEach(definition => {
            const rgDefinition = {
                definition: definition?.shortdef?.[0],
                partOfSpeech: definition?.fl,
                audioFileName: definition?.hwi?.prs?.[0]?.sound?.audio
            };
            definitions.push(rgDefinition);        
        });
    }
    return definitions;
};

export default {
    parse
};