

const parse = (word, definitionResponse) => {
    let definitionConcat = '';
    if (definitionResponse?.length > 0) {
        let definitions = definitionResponse.filter(definition => {
            const metaID = definition?.meta?.id;
            const wordFromMetaID = metaID.substring(0, metaID.length-2);
            return wordFromMetaID === word;
        });
        if (definitions.length === 0) {
            definitions = definitionResponse.filter(definition => {
                const metaID = definition?.meta?.id;
                return metaID === word;
            });
        }
        definitions.forEach(definition => {
            definitionConcat += definition?.shortdef?.[0]+"\n\n";
        });
    }
    return definitionConcat;
};

export default {
    parse
};