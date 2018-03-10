#!node

const mongoose = require('mongoose');
const fs = require('fs');
const Location = require('./src/data/models/Location');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}/${process.env.RDCPT_DB || 'roadcaptain'}`);

console.log('starting');

const stuff = fs.readFileSync('npspoi/poi.geojson');

const stuffJson = JSON.parse(stuff);
const features = stuffJson.features;
// features = stuffJson.features.filter(x=>{
//     // return !(
//     //     x.properties.name === null ||
//     //     x.properties.name.match(/restroom/i) ||
//     //     x.properties.tags.match(/"nps:fcat"=>"Sign"/i)
//     // );
//     return !(x.properties.name === null);
// });

const promises = [];

Location.remove({}).then(() => {
  for (let location of features) {
    promises.push(Location.create({
      osm_id: location.properties.osm_id,
      osm_version: location.properties.osm_version,
      created: location.properties.created,
      tags: location.properties.tags,
      type: location.properties.type,
      name: location.properties.name,
      gps: {
        coordinates: [
          location.geometry.coordinates[0],
          location.geometry.coordinates[1]
        ]
      }
    }));
  }
  return Promise.all(promises);
}).then((results) => {
  console.log(`all done, imported ${results.length}, here's a sample`);
  const rand = parseInt(Math.random() * 100);
  console.log(results[rand]);
  werd(results[rand]);
}).catch(e => {
  console.log(e);
});

const werd = (randResult) => {
  Location.find({
    gps: {
      $near: {
        $geometry: randResult.gps,
        $minDistance: 160000,
        $maxDistance: 180000
      }
    }
  }, (error, locations) => {
    if (error) console.log(error);
    console.log(locations[0]);
    mongoose.disconnect();
  });
};

console.log('kicked off the party');
