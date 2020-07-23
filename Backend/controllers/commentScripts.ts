import CommentSchema from '../models/Comment';
import {query} from "express";

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

  commentObject.save().then((document: any) =>{
    // Return json document as it now contains the ID and Date
    res.status(200).json(document);
  })
};

exports.getComments = async function(req: any, res: any) {
  let DBQuery: any = {};

  if(req.query.FlightId){
    DBQuery['FlightId'] = req.query.FlightId;
  }

  let transaction = CommentSchema.find(DBQuery);

  if(req.query.sort && req.query.order){
    let order: string = req.query.order ? '' : '-';
    transaction.sort(order + req.query.sort);
  }

  let comments = await transaction;
  res.status(200).json(comments);
}

exports.getUniqueFlightID = async function(req: any, res: any) {
  let distinctFlightIDs = await CommentSchema.distinct('FlightId');
  res.status(200).json(distinctFlightIDs)
}
