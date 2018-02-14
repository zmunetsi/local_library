

var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);
//virtual for date of birth formatted
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

//virtual for date of death formatted
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

//virtual for lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return 'From '+this.date_of_birth_formatted+' To '+this.date_of_death_formatted;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
