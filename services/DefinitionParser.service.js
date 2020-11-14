

const parse = (word, definitionResponse) => {
    let definitionConcat = '';
    if (definitionResponse?.length > 0) {
        const definitions = definitionResponse.filter(definition => {
            const metaID = definition?.meta?.id;
            const wordFromMetaID = metaID.substring(0, metaID.length-2);
            return wordFromMetaID === word;
        });
        definitions.forEach(definition => {
            definitionConcat += definition?.shortdef?.[0]+"\n\n";
        });
    }
    return definitionConcat;
};

export default {
    parse
};