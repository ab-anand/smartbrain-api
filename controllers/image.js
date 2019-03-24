const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f3861076335c4a0c8b369d516db678ae'
});

const handleApiCall = (req, res) => {
  app.models
   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data =>{
     res.json(data);
   })
   .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db)=>{
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(404).json('unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
