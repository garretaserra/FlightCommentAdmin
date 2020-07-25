import mongoose, {Schema} from 'mongoose'

export const CommentSchema: Schema = new Schema<any>({
  // Default index will be named "_id"
  comment:    {type: String,  required:true, minlength: 1},             // Avoid empty comments
  date:       {type: Date,    required: true, validate: checkDates},
  UserId:     {type: Number,  required: true, min: 0, max:9999999999},  // Limit UserId to 10 digits
  FlightId:   {type: Number,  required: true, min: 0, max:9999999999},  // Limit FlightId to 10 digits
  Tags:       {type: [String]}
})

export default mongoose.model('Comment', CommentSchema);

function checkDates(date: Date) {
  // Check that the date is older than current time and later than Unix epoch
  return date.getMilliseconds() < Date.now() && date.getMilliseconds() > 0;
}
