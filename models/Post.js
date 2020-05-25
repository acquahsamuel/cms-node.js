const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
 /*  user: {

  }, */

  title: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "public"
  },

  allowComments: {
    type: Boolean,
    required: true
  },
  body: {
    type: String,
    default: true
<<<<<<< HEAD
  },

  file : {
    type : String,
  },

  date : {
    type : Date,
    default : Date.now()
  }

});





=======
  }
});

>>>>>>> 94cf152fbaea6ceb850a311c8dec65b16c5551fe
module.exports = mongoose.model("post", PostSchema);
