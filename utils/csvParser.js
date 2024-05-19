const csv = require('csv-parser');
const fs = require('fs');

const parseCSV = (filePath, list) => {
    return new Promise((resolve, reject) => {
        const users = [];
        const errors = [];
        const customProps = list.customProperties.reduce((acc, prop) => {
            acc[prop.title] = prop.defaultValue;
            return acc;
        }, {});

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.name && row.email) {
                    const properties = { ...customProps };
                    for (const prop in row) {
                        if (prop !== 'name' && prop !== 'email' && row[prop]) {
                            properties[prop] = row[prop];
                        }
                    }
                    users.push({
                        name: row.name,
                        email: row.email,
                        properties,
                        listId: list._id
                    });
                } else {
                    errors.push({ email: row.email, error: 'Missing required fields' });
                }
            })
            .on('end', () => {
                resolve({ users, errors });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = parseCSV;
