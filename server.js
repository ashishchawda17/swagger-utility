const fs = require('fs');

function extractDescriptions(json, parentKey) {
    const result = {};

    for (const key in json) {
        if (json[key] && typeof json[key] === 'object') {
            parentKey = key;
            const nestedDescriptions = extractDescriptions(json[key], parentKey);
            Object.assign(result, nestedDescriptions);
        } else if (key === 'description') {
            result[convertToUpperCaseWithUnderscores(parentKey)] = json[key];
        }
    }

    return result;
}

function convertToUpperCaseWithUnderscores(text) {
    return text.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

fs.readFile('swagger.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const swaggerJson = JSON.parse(data);
    const descriptions = extractDescriptions(swaggerJson, '');

    fs.writeFile('descriptions.json', JSON.stringify(descriptions, null, 2), (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('descriptions.json created successfully.');
    });
});
