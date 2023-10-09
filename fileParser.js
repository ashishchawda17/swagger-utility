const fs = require('fs');

function generateJavaInterface(descriptions) {
    let javaCode = `public interface Descriptions {\n`;

    for (const key in descriptions) {
        if(descriptions[key] != ""){
            javaCode += `    String ${key} = "${descriptions[key]}";\n`;       
        }
    }

    javaCode += `}\n`;

    return javaCode;
}

fs.readFile('descriptions.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const descriptions = JSON.parse(data);
    const javaInterfaceCode = generateJavaInterface(descriptions);

    fs.writeFile('Descriptions.java', javaInterfaceCode, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('Descriptions.java created successfully.');
    });
});
