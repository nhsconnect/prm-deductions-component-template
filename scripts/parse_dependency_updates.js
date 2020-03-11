// Usage: node parse_updates.js $(npm outdated --parseable)

const updateRegexPattern = '^.*:(.*)@(.*):.*@(.*):.*@(.*)$';

const extractDependencyUpdatesFromList = listOfUpdates => listOfUpdates.filter(item => isUpdate(item));

const isUpdate = updateString => updateString.split(':').length > 1;

const fromString = updateString => {

    const matcher = updateString.match(updateRegexPattern);

    return {
        package: matcher[1],
        currentVersion: matcher[2],
        wantedVersion: matcher[3],
        latestVersion: matcher[4]
    };
};

const getAllUpdates = listOfUpdates => extractDependencyUpdatesFromList(listOfUpdates)
    .map(update => fromString(update));

module.exports = { extractDependencyUpdatesFromList, isUpdate, fromString, getAllUpdates };

console.log(getAllUpdates(process.argv));