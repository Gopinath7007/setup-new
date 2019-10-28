import * as mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: String,
  category: String,
  url: String,
  channelImage: String  

});

const Channel = mongoose.model('Tabs', channelSchema);

export default Channel;

