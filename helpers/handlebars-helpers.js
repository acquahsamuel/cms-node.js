<<<<<<< HEAD
const moment = require("moment");

module.exports = {
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$&selected="selected"'
      );
  },

  generateDate: function (date, format) {
    return moment(date).format(format);
  }
};


=======
module.exports ={

    select : function(selected, options){
       return options.fn(this).replace(new RegExp(' value=\"'+ selected + '\"'), '$&selected="selected"');
    }
};

>>>>>>> 94cf152fbaea6ceb850a311c8dec65b16c5551fe
