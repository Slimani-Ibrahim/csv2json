function InvalidCSVFileError(message) {
    this.message = message;
}

InvalidCSVFileError.prototype = new Error();
InvalidCSVFileError.prototype.name = "InvalidCSVFileException";


const csv2json = (csv, delimiter = ';') => {
    var titles = csv.slice(0, csv.indexOf('\n')).split(delimiter);
    const rows = csv.slice(csv.indexOf('\n') + 1).split('\n');
    return rows.map(row => {
        const values = row.split(delimiter);
        return titles.reduce((object, current, index) =>
            (object[current.trim()] = values[index].trim(), object), {});
    });
}

const csvFile2json = (file, delimiter) => new Promise((resolve, reject) => {
    try {
        if (file.name.split('.').pop() === "csv") {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let csvToString = reader.result;
                resolve(csv2json(csvToString, delimiter));
            };
        } else {
            reject(new InvalidCSVFileError("Invalid file format exception"));
        }
    } catch (error) {
        reject(new InvalidCSVFileError("Unhandled exception error"));
    }
});

module.exports = {
    csv2json, csvFile2json
}