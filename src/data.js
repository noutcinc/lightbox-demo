import Flickr from 'flickr-sdk';

const CLIENT_KEY = process.env.VUE_APP_FLICKR_API_KEY;

// create a new Flickr API client. since we're requesting a
// resource that doesn't require user authentication, we can
// just use our API key.
const connect = () =>{
  return new Flickr(CLIENT_KEY);
}

// call the flickr.photos.search API method and search the photos!
const api = {
  search: (v) => {
    if(!v){
      throw Error(`Please provide a value to search for.`);
    }
    return connect().photos.search({
      text: v,
      extras: "date_taken,owner_name,views,url_t"
    }).then(function (res) {
      const images = res.body.photos.photo.map(p => {
        return {
          url: `http://farm${p.farm}.static.flickr.com/${p.server}/${p.id}_${p.secret}.jpg`,
          thumb: `http://farm${p.farm}.static.flickr.com/${p.server}/${p.id}_${p.secret}_t.jpg`,
          title: p.title,
          ownername: p.owner_name || 'Unknown owner',
          datetaken: p.date_taken,
          views: p.views,
          id: p.id
        }
      });
return images;

    }).catch(function (err) {
      throw err;
    }); 
  },

  getInfo: (id) => {
    connect().photos.getInfo({
      photo_id: id
    }).then(function (res) {
      return res.body;
    }).catch(function (err) {
      throw err;
    });
  }
};

export default api;