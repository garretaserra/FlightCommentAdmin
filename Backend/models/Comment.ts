import {Schema} from 'mongoose'

const CommentSchema: Schema = new Schema<any>({
  // Default index will be named "_id"
  comment:    {type: String,  required:true},
  date:       {type: Date,    required: true},
  UserId:     {type: Number,  required: true},
  FlightId:   {type: Number,  required: true},
  Tags:       {type: [String]}
})
