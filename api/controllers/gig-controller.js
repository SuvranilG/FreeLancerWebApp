import Gig from "../models/gig-model.js";
import User from "../models/user-model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  let gigCreator;
  if(q.search){
    gigCreator= await User.find({username:q.search});
    if(gigCreator){
      // console.log(gigCreator?.[0]._id.toString());
      gigCreator._id=gigCreator[0]._id.toString();
      // console.log(gigCreator?._id);
    }

  }
  
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    $or:[
      { title: { $regex: q.search, $options: "i" } } ,
      { shortDesc: { $regex: q.search, $options: "i" } },
      {  desc: { $regex: q.search, $options: "i" } },
      
    ],   
    // $or:[],
  };

  if (gigCreator) {
    filters.$or.push({ userId: { $regex: gigCreator?._id, $options: "i" } });
  }
  // other way around
  // if (q.search) {
  //   const searchTerms = q.search.split(/\s+/); // Split by whitespace
  //   searchTerms.forEach((term) => {
  //     filters.$or.push(
  //       { title: { $regex: term, $options: "i" } },
  //       { shortDesc: { $regex: term, $options: "i" } },
  //       { desc: { $regex: term, $options: "i" } }
  //     );
  //   });
  // }


  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
