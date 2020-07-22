import CommentSchema from '../models/Comment';

exports.createComment = async function(req: any, res: any){
  let body = req.body;
  let commentObject: any = new CommentSchema()

  // Validation
  // Check all required attributes.
  let comment;
  if(body.comment){
    comment = body.comment;
  }
  else{
    res.status(400).send('Missing comment');
    return ;
  }

  let UserId;
  if(body.UserId){
    UserId = body.UserId;
  }
  else {
    res.status(400).send('Missing UserId');
    return ;
  }

  let FlightId;
  if(body.FlightId){
    FlightId = body.FlightId;
  }
  else {
    res.status(4000).send('Missing FlightId');
    return ;
  }

  try {
    commentObject.comment = comment;
    commentObject.UserId = UserId;
    commentObject.FlightId = FlightId;
    commentObject.Tags = req.body.Tags;
    commentObject.date = Date.now();
  }
  catch (e) {
    console.log('Error while trying to create new Comment: ' + e);
    return ;
  }

  commentObject.save().then((error: any, document: any) =>{
    if(error){
      res.status(500).send('An internal error has happened');
      console.log(error);
    }
    else{
      // Return json document as it now contains the ID and Date
      res.status(200).json(document);
    }
  })
};

exports.getComments = async function(req: any, res: any) {
  // TODO: Add filters
  let comments = await CommentSchema.find();
  res.status(200).json(comments);
}
